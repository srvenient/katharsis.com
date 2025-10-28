from typing import Annotated

from fastapi import APIRouter, Response, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import AppContextDep
from app.api.user.application.auth_service import AuthService
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
