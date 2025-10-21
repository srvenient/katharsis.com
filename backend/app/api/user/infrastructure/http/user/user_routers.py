from app.api.deps import AppContextDep
from app.api.user.domain.user_models import UserPublic
from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["User"])


@router.get("/me", response_model=UserPublic)
async def get_current_user(ctx: AppContextDep):
    if ctx.current_user is None:
        return None
    return UserPublic.model_validate(ctx.current_user)