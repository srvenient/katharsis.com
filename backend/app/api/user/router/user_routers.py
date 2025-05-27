from fastapi import APIRouter

from app.api.deps import CurrentUser

router = APIRouter(prefix="/user", tags=["users"])


@router.get("/me")
def verify_token(student: CurrentUser):
    return student