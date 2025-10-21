from fastapi import APIRouter
from app.api.user.infrastructure.http.auth import auth_routers
from app.api.user.infrastructure.http.user import user_routers

api_router = APIRouter()

# Include router
api_router.include_router(router=auth_routers.router)
api_router.include_router(router=user_routers.router)
