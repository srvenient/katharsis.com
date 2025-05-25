from datetime import timedelta
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError
from starlette import status
from starlette.responses import JSONResponse

from app.api.auth.model.token_models import Token
from app.api.deps import SessionDep, CurrentUser, get_token_from_cookie
from app.api.user.model.user_models import User, UserCreate
from app.api.user.repository import user_crud
from app.core import security
from app.core.config import settings
from app.core.security import get_password_hash
from app.utils import Message, generate_password_reset_token, generate_reset_password_email, send_email, NewPassword, \
    verify_password_reset_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login/access-token")
def login_access_token(
        session: SessionDep,
        response: Response,
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    print(form_data.username, form_data.password)
    user = user_crud.authenticate(
        session=session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The email/username or password is incorrect",
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is inactive",
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        secure=False,
        samesite="lax"
    )

    return Token(access_token=access_token)


@router.post("/register", response_model=User)
def register(
        user_create: UserCreate,
        session: SessionDep,
) -> User:
    """
    Register a new user
    """
    user = user_crud.get_user_by_email(session=session, email=str(user_create.email))
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El usuario ya existe con ese correo electrónico",
        )
    try:
        user = user_crud.create_user(session=session, user_create=user_create)
    except IntegrityError:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ha ocurrido un error al crear el usuario",
        )
    return user


@router.post("/logout")
def logout(token: Annotated[str, Depends(get_token_from_cookie)]) -> Response:
    if not token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active session"
        )

    response = JSONResponse(content={"message": "Logged out successfully"})
    response.delete_cookie("access_token")
    return response


@router.get("/me")
def verify_token(student: CurrentUser):
    return student


@router.post("/password-recovery/{email}")
def recover_password(email: str, session: SessionDep) -> Message:
    """
       Password Recovery
       """
    user = user_crud.get_user_by_email(session=session, email=email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system.",
        )
    password_reset_token = generate_password_reset_token(email=email)
    email_data = generate_reset_password_email(
        email_to=user.email, email=email, token=password_reset_token
    )
    send_email(
        email_to=user.email,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Password recovery email sent")


@router.post("/reset-password")
def reset_password(session: SessionDep, body: NewPassword) -> Message:
    """
    Reset password
    """
    print(body)
    email = verify_password_reset_token(token=body.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = user_crud.get_user_by_email(session=session, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system.",
        )
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    hashed_password = get_password_hash(password=body.new_password)
    user.hashed_password = hashed_password
    session.add(user)
    session.commit()
    return Message(message="Password updated successfully")
