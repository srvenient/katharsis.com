from typing import Annotated

from fastapi import APIRouter, Response, Depends, Form, Body
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import AppContextDep
from app.api.shared.service.email_service import NewPassword
from app.api.user.application.auth.auth_service import AuthService
from app.api.user.domain.user_models import UserCreate

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", status_code=201)
async def register(ctx: AppContextDep, user_create: UserCreate, ):
    return await ctx.auth_service.register_user(user_create)


@router.post("/login", status_code=200)
async def login(
        response: Response,
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        ctx: AppContextDep
):
    return await ctx.auth_service.authenticate_user(response, form_data)


@router.post("/logout", status_code=204)
async def logout(response: Response):
    return await AuthService.logout_user(response)


@router.post("/password-recovery/{email}")
async def recover_password(email: str, ctx: AppContextDep):
    return await ctx.auth_service.recover_password(email)


@router.post("/reset-password")
async def reset_password(body: NewPassword, ctx: AppContextDep):
    return await ctx.auth_service.reset_password(body)


@router.post("/2fa/setup/start", status_code=200)
async def start_2fa_setup(ctx: AppContextDep):
    return await ctx.two_factor_service.start_2fa_setup(ctx.current_user)


@router.delete("/2fa/setup/cancel", status_code=200)
async def cancel_2fa_setup(ctx: AppContextDep):
    return await ctx.two_factor_service.cancel_2fa_setup(ctx.current_user)


@router.post("/2fa/setup/confirm")
async def confirm_2fa_setup(
        ctx: AppContextDep,
        payload: dict = Body(...),
):
    return await ctx.two_factor_service.confirm_2fa_setup(ctx.current_user, payload.get("code"))


@router.delete("/2fa/disable", status_code=200)
async def disable_2fa(ctx: AppContextDep):
    return await ctx.two_factor_service.disable_2fa(ctx.current_user)


from fastapi import Form


@router.post("/2fa/verify", status_code=200)
async def verify_2fa(
        response: Response,
        ctx: AppContextDep,
        temp_token: str = Form(...),
        code: str = Form(...),
):
    return await ctx.two_factor_service.verify_2fa_code(response, temp_token, code)
