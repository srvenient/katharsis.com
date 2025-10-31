import base64
import uuid
from datetime import timedelta, datetime, timezone
from io import BytesIO
from typing import Optional

import pyotp
import qrcode
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jwt import InvalidTokenError
from passlib.context import CryptContext

from app.core.config import settings

ACCESS_AUD = "access"
REFRESH_AUD = "refresh"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DUMMY_HASHED_PASSWORD = pwd_context.hash("dummy_password")

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=settings.OAUTH2_TOKEN_URL,
    scopes=settings.OAUTH2_SCOPES,
    auto_error=True,
)


def create_access_token(subject: str, aud: str, ttl: timedelta, extra: Optional[dict] | None = None) -> tuple[str, str]:
    """
    Sign a JWT token with the given subject, audience, and time-to-live.

    :param subject: The subject of the token (usually the user ID).
    :param aud: The audience for which the token is intended.
    :param ttl: Time-to-live for the token.
    :param extra: Additional claims to include in the token.
    :return: Signed JWT token as a string.
    """
    jti = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "aud": aud,
        "jti": jti,
        "iat": int(now.timestamp()),
        "nbf": int(now.timestamp()),
        "exp": int((now + ttl).timestamp()),
    }
    if extra:
        payload.update(extra)

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return token, jti


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password) -> str:
    """Hash a password using bcrypt."""
    return pwd_context.hash(password)


def get_totp_uri(secret: str, username: str, issuer_name="Katharsis") -> str:
    return pyotp.TOTP(secret).provisioning_uri(name=username, issuer_name=issuer_name)


def generate_2fa_secret_key(username: str) -> tuple[str, bytes]:
    secret = pyotp.random_base32()
    uri = get_totp_uri(secret=secret, username=username)
    qr = qrcode.make(uri)
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    qr_base64 = base64.b64encode(buffer.getvalue())
    return secret, qr_base64


def verify_2fa_token(secret: str, token: str) -> bool:
    return pyotp.TOTP(secret).verify(token)


def get_dummy_hashed_password() -> str:
    """Return a dummy hashed password for timing attack prevention."""
    return DUMMY_HASHED_PASSWORD


def generate_reset_password_token(email: str) -> str:
    delta = timedelta(hours=settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS)
    now = datetime.now(timezone.utc)
    expires = now + delta
    exp = expires.timestamp()
    encoded_jwt = jwt.encode(
        {"exp": exp, "nbf": now, "sub": email},
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> str | None:
    try:
        decoded_token = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        return str(decoded_token["sub"])
    except InvalidTokenError:
        return None
