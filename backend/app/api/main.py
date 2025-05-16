from fastapi import APIRouter

from app.api.user.router import user_routers
from app.api.auth.router import auth_routers

api_router = APIRouter()

# Include router
api_router.include_router(router=auth_routers.router)
api_router.include_router(router=user_routers.router)