from fastapi import APIRouter

from app.api.deps import CurrentUser

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me")
def verify_token(student: CurrentUser):
    return student