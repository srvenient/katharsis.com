import datetime
import uuid

from typing import Optional, TYPE_CHECKING

from sqlalchemy import UniqueConstraint
from sqlmodel import Relationship, SQLModel, Field

from app.api.shared.domain.document_type import DocumentType

if TYPE_CHECKING:
    from app.api.role.domain.role_models import Role
    from app.api.tenant.domain.tenant_models import Tenant


class UserBase(SQLModel):
    doc_type: DocumentType = Field(default=DocumentType.ID_CARD)
    doc_number: str = Field(primary_key=True, max_length=20)
    email: str = Field(index=True, nullable=False)
    full_name: Optional[str] = Field(default=None, max_length=255)

    is_active: bool = Field(default=True, nullable=False)
    is_superuser: bool = Field(default=False, nullable=False)


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


class User(UserBase, table=True):
    __tablename__ = "users"
    __table_args__ = (
        UniqueConstraint("tenant_id", "email"),
    )

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    role_id: Optional[uuid.UUID] = Field(
        default=None,
        foreign_key="roles.id",
        nullable=True
    )
    tenant_id: Optional[uuid.UUID] = Field(default=None, foreign_key="tenants.id", index=True, nullable=True)

    role: Optional["Role"] = Relationship(back_populates="users")
    tenant: Optional["Tenant"] = Relationship(
        back_populates="users",
        sa_relationship_kwargs={"foreign_keys": "[User.tenant_id]"}
    )
    owned_tenants: list["Tenant"] = Relationship(
        back_populates="owner",
        sa_relationship_kwargs={"foreign_keys": "[Tenant.owner_id]"}
    )

    hashed_password: str = Field(nullable=False)

    is_2fa_enabled: bool = Field(default=False, nullable=False)
    otp_secret: Optional[str] = Field(default=None, nullable=True)

    last_login: Optional[datetime.datetime] = Field(default=None)

    created_at: datetime.datetime = Field(
        nullable=False,
        default_factory=lambda: datetime.datetime.now(datetime.timezone.utc)
    )
    updated_at: datetime.datetime = Field(
        nullable=False,
        default_factory=lambda: datetime.datetime.now(datetime.timezone.utc),
        sa_column_kwargs={"onupdate": datetime.datetime.now(datetime.timezone.utc)}
    )


class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


from app.api.tenant.domain import tenant_models  # noqa: F401
