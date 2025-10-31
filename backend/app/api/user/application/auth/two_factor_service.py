from typing import Any, Coroutine

import jwt
from fastapi import Response, HTTPException, status
from jwt import InvalidTokenError
from starlette.responses import JSONResponse

from app.api.role.application.role_service import RoleService
from app.api.shared.aggregate.infrastructure.repository.sql.sql_alchemy_aggregate_root_repository import \
    SQLAlchemyAggregateRootRepository
from app.api.tenant.domain.tenant_models import Tenant
from app.api.user.application.auth.auth_service import AuthService
from app.api.user.domain.user_models import User
from app.core import security
from app.core.config import settings


class TwoFactorService:
    def __init__(
            self,
            user_repo: SQLAlchemyAggregateRootRepository[User],
            role_service: RoleService,
            tenant_repo: SQLAlchemyAggregateRootRepository[Tenant],
    ):
        self.user_repo = user_repo
        self.role_service = role_service
        self.tenant_repo = tenant_repo

    async def start_2fa_setup(self, user: User) -> dict[str, bytes | str]:
        if user.is_2fa_enabled:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="2FA is already enabled for this user"
            )

        secret_key, qr_image_base64 = security.generate_2fa_secret_key(user.email)

        user.otp_secret = secret_key

        await self.user_repo.save_async(user)

        return {"qr_code": qr_image_base64, "secret_key": secret_key}

    async def cancel_2fa_setup(self, user: User) -> JSONResponse:
        user.otp_secret = None

        await self.user_repo.save_async(user)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"detail": "2FA initialization canceled successfully"}
        )

    async def confirm_2fa_setup(self, user: User, code: str) -> JSONResponse:
        if not user.otp_secret:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="2FA setup not initialized"
            )

        totp = security.pyotp.TOTP(user.otp_secret)
        if not totp.verify(code, valid_window=1):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid 2FA code"
            )

        user.is_2fa_enabled = True

        await self.user_repo.save_async(user)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"detail": "2FA enabled successfully"}
        )

    async def disable_2fa(self, user: User) -> JSONResponse:
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        if not user.is_2fa_enabled:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="2FA is not enabled for this user"
            )

        user.is_2fa_enabled = False
        user.otp_secret = None

        await self.user_repo.save_async(user)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"detail": "2FA disabled successfully"}
        )

    async def verify_2fa_code(self, response: Response, temp_token: str, code: str) -> JSONResponse:
        try:
            payload = jwt.decode(
                jwt=temp_token,
                key=settings.SECRET_KEY,
                algorithms=settings.ALGORITHM
            )
            if payload.get("type") != "2fa_challenge":
                raise InvalidTokenError("Invalid 2FA challenge token type")
            user_id: str = payload.get("sub")
        except InvalidTokenError:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid or expired 2FA challenge token"
            )

        user: User = await self.user_repo.find_async(id=user_id)

        if not user or not user.is_2fa_enabled or not user.otp_secret:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found or 2FA not enabled"
            )

        totp = security.pyotp.TOTP(user.otp_secret)
        if not totp.verify(code, valid_window=1):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid 2FA code"
            )

        access_token = AuthService.issue_access_token(user)

        resp = JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"detail": "2FA verification successful"}
        )

        resp.set_cookie(
            key="access_token",
            value=access_token.access_token,
            httponly=True,
            secure=True if settings.ENV == "production" else False,
            samesite="strict" if settings.ENV == "production" else "lax",
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

        return resp
