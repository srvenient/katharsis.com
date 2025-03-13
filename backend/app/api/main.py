from fastapi import APIRouter

from app.api.auth.routers import auth_routers

api_router = APIRouter()
api_router.include_router(auth_routers.router, tags=["auth"])