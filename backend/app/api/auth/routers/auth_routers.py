from fastapi import APIRouter


router = APIRouter()


@router.post("/login/access-token")
async def login_access_token():
    return {"message": "Login access token"}