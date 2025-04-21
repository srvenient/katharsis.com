from fastapi import APIRouter

from app.api.user.router import user_routers

api_router = APIRouter()

api_router.include_router(router=user_routers.router)