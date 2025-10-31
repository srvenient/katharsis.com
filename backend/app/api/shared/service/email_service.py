from dataclasses import dataclass
from pathlib import Path
from typing import Any

import emails
from fastapi import logger
from jinja2 import Template
from pydantic import EmailStr
from sqlmodel import SQLModel, Field

from app.core.config import settings


class Message(SQLModel):
    message: str


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)


@dataclass
class EmailData:
    html_content: str
    subject: str


class ForgotPasswordRequest(SQLModel):
    email: EmailStr


class ResetPasswordRequest(SQLModel):
    token: str
    password: str = Field(..., min_length=8)


def render_email_template(*, template_name: str, context: dict[str, Any]) -> str:
    template_path = Path("/app/app/email-templates/build/") / template_name
    template_str = template_path.read_text()
    html_content = Template(template_str).render(context)
    return html_content


def send_email(
        *,
        email_to: str,
        subject: str = "",
        html_content: str = "",
) -> None:
    assert settings.emails_enabled, "no provided configuration for email variables"
    message = emails.Message(
        subject=subject,
        html=html_content,
        mail_from=(settings.EMAILS_FROM_NAME, settings.EMAILS_FROM_EMAIL),
    )
    smtp_options = {"host": settings.SMTP_HOST, "port": settings.SMTP_PORT}
    if settings.SMTP_TLS:
        smtp_options["tls"] = True
    elif settings.SMTP_SSL:
        smtp_options["ssl"] = True
    if settings.SMTP_USER:
        smtp_options["user"] = settings.SMTP_USER
    if settings.SMTP_PASSWORD:
        smtp_options["password"] = settings.SMTP_PASSWORD
    response = message.send(to=email_to, smtp=smtp_options)
    logger.logger.info(f"send email result: {response}")


def generate_reset_password_email(email_to: str, email: str, token: str) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Password recovery for user {email}"
    link = f"{settings.FRONTEND_HOST}/reset-password?token={token}"
    html_content = render_email_template(
        template_name="reset_password.html",
        context={
            "project_name": settings.PROJECT_NAME,
            "username": email,
            "email": email_to,
            "valid_hours": settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS,
            "link": link,
        },
    )
    return EmailData(html_content=html_content, subject=subject)
