import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional

from sqlalchemy import func
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.api.user.domain.user_models import User


class TenantBase(SQLModel):
    name: str = Field(max_length=255)
    slug: str = Field(unique=True, index=True, max_length=100)
    is_active: bool = Field(default=True)


class TenantCreate(TenantBase):
    pass


class Tenant(TenantBase, table=True):
    __tablename__ = "tenants"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)

    owner: Optional["User"] = Relationship(
        back_populates="owned_tenants",
        sa_relationship_kwargs={"foreign_keys": "[Tenant.owner_id]"}
    )
    users: list["User"] = Relationship(
        back_populates="tenant",
        sa_relationship_kwargs={"foreign_keys": "[User.tenant_id]"}
    )

    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc),
                                 sa_column_kwargs={"onupdate": func.now()})
