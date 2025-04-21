import secrets

from pydantic_settings import BaseSettings, SettingsConfigDict


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


settings = Settings() # type: ignore
