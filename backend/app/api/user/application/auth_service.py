from typing import Optional

import jwt
from fastapi import Response, HTTPException, status, Cookie
from fastapi.security import OAuth2PasswordRequestForm
from jwt import InvalidTokenError
from pydantic import ValidationError
from starlette.responses import JSONResponse

from app.api.role.application.role_service import RoleService
from app.api.shared.aggregate.infrastructure.repository.sql.sql_alchemy_aggregate_root_repository import \
    SQLAlchemyAggregateRootRepository
from app.api.tenant.application.tenant_service import TenantService
from app.api.tenant.domain.tenant_models import Tenant
from app.api.user.domain.auth_models import Token, TokenPayload
from app.api.user.domain.user_models import User, UserCreate
from app.core import security
from app.core.config import settings


class AuthService:
    def __init__(
            self,
            user_repo: SQLAlchemyAggregateRootRepository[User],
            role_service: RoleService,
            tenant_repo: SQLAlchemyAggregateRootRepository[Tenant],
    ):
        self.user_repo = user_repo
        self.role_service = role_service
        self.tenant_repo = tenant_repo

    @staticmethod
    def issue_access_token(user: User) -> Token:
        access_token, jti = security.create_access_token(
            subject=str(user.id),
            aud=security.ACCESS_AUD,
            ttl=security.timedelta(minutes=security.settings.ACCESS_TOKEN_EXPIRE_MINUTES),
            extra={"role": user.role.name} if user.role else None
        )
        return Token(access_token=access_token)

    async def get_user_by_email(self, email: str) -> User | None:
        return await self.user_repo.find_async(email=email)

    async def get_current_user_from_token(self, access_token: Optional[str] = Cookie(None)) -> User | None:
        if access_token is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )

        try:
            payload = jwt.decode(
                token=access_token,
                key=settings.SECRET_KEY,
                algorithms=settings.ALGORITHM
            )
            token_data = TokenPayload(**payload)
        except(InvalidTokenError, ValidationError):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not validate credentials"
            )

        user: User = await self.user_repo.find_async(id=token_data.sub)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User is inactive"
            )

        return user

    async def register_user(self, user_create: UserCreate) -> JSONResponse:
        existing_user = await self.get_user_by_email(user_create.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This email is already registered. Please use another one."
            )

        admin_role = await self.role_service.get_role_by_name("admin")
        if not admin_role:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Admin role not found"
            )

        hashed_password = security.get_password_hash(user_create.password)
        user = User.model_validate(
            user_create,
            update={
                "hashed_password": hashed_password,
                "role_id": admin_role.id,
            }
        )

        await self.user_repo.save_async(user)

        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"detail": "User created successfully"}
        )

    async def authenticate_user(
            self,
            response: Response,
            form_data: OAuth2PasswordRequestForm
    ) -> JSONResponse:
        form_password = form_data.password

        user: User = await self.get_user_by_email(form_data.username)

        # Avoid timing attacks by using a constant-time comparison
        if not user:
            # If user is not found, we still call verify_password to mitigate timing attacks
            security.verify_password(
                form_password,
                security.DUMMY_HASHED_PASSWORD
            )

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )

        # Verify the password is correct
        if not security.verify_password(form_password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )

        # Check if the user is active
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user"
            )

        # Generate JWT token
        access_token = AuthService.issue_access_token(user)

        resp = JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"detail": "Login successful"}
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
