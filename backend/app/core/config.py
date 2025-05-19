import secrets
import warnings
from typing import Annotated, Any, Self

from pydantic import AnyUrl, BeforeValidator, computed_field, HttpUrl, PostgresDsn, model_validator, EmailStr
from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        # Use top level .env file (one level above ./backend/)
        env_file="../.env",
        env_ignore_empty=True,
        extra="ignore",
    )

    PROJECT_NAME: str = "katharsis-backend"
    PROJECT_VERSION: str = "0.0.1"
    PROJECT_DESCRIPTION: str = "In a world where efficiency and organization are key to success, we present an Inventory Management System designed to streamline inventory control, reduce costs, and enhance productivity."

    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    FRONTEND_HOST: str = "http://localhost:5173"

    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []

    @computed_field  # type: ignore[prop-decorator]
    @property
    def all_cors_origins(self) -> list[str]:
        return [str(origin).rstrip("/") for origin in self.BACKEND_CORS_ORIGINS] + [
            self.FRONTEND_HOST
        ]

    SMTP_TLS: bool = True
    SMTP_SSL: bool = False
    SMTP_PORT: int = 587
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_USER: EmailStr = "nrodriguezr@unimonserrate.edu.co"
    SMTP_PASSWORD: str = "vtwd koxc scmz yegx"
    EMAILS_FROM_EMAIL: EmailStr = "nrodriguezr@unimonserrate.edu.co"
    EMAILS_FROM_NAME: str = "Katharsis"

    @model_validator(mode="after")
    def _set_default_emails_from(self) -> Self:
        if not self.EMAILS_FROM_NAME:
            self.EMAILS_FROM_NAME = self.PROJECT_NAME
        return self

    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48

    @computed_field  # type: ignore[prop-decorator]
    @property
    def emails_enabled(self) -> bool:
        return bool(self.SMTP_HOST and self.EMAILS_FROM_EMAIL)

    EMAIL_TEST_USER: EmailStr = "test@example.com"

    POSTGRES_USER: str = "library_owner"
    POSTGRES_PASSWORD: str = "npg_jLdbhi7x1Ycv"
    POSTGRES_SERVER: str = "ep-withered-fog-a8jq1uxt-pooler.eastus2.azure.neon.tech"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "katharsis"
    POSTGRES_SSLMODE: str = "require"

    @computed_field  # type: ignore[prop-decorator]
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
            query="sslmode=" + self.POSTGRES_SSLMODE
        )


settings = Settings()  # type: ignore
