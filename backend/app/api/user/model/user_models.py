from pydantic import EmailStr
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING, List
from enum import Enum

if TYPE_CHECKING:
    from app.api.tenant.model.tenant_models import Tenant


class RoleBase(SQLModel):
    name: str = Field(max_length=100)
    description: Optional[str] = None


class Role(RoleBase, table=True):
    id: int = Field(default=None, primary_key=True)
    users: List["User"] = Relationship(back_populates="role")


class RolePublic(RoleBase):
    id: int


class DocumentType(str, Enum):
    ID_CARD = "ID_Card"  # CC
    FOREIGN_ID = "Foreign_ID"  # CE
    PASSPORT = "Passport"  # PASAPORTE
    CITIZEN_CARD = "Citizen_Card"  # TI
    TAX_ID = "Tax_ID"  # NIT


class UserBase(SQLModel):
    document_type: DocumentType = Field(default=DocumentType.ID_CARD)
    id: str = Field(primary_key=True, max_length=20)
    email: str = Field(index=True, max_length=255)
    username: str = Field(index=True, max_length=255)
    phone_number: str = Field(index=True, max_length=255)
    is_active: bool = True
    full_name: Optional[str] = Field(default=None, max_length=255)
    tenant_id: int = Field(foreign_key="tenant.id")


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)
    role_id: Optional[int] = Field(default=None, foreign_key="role.id")


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    username: str = Field(index=True, max_length=255)
    phone_number: str = Field(index=True, max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: Optional[str] = Field(default=None, max_length=255)
    tenant_id: int = Field(foreign_key="tenant.id")


class UserUpdate(SQLModel):
    email: Optional[EmailStr] = Field(default=None, max_length=255)
    username: Optional[str] = Field(default=None, max_length=255)
    phone_number: Optional[str] = Field(default=None, max_length=255)
    password: Optional[str] = Field(default=None, min_length=8, max_length=40)
    full_name: Optional[str] = Field(default=None, max_length=255)
    is_active: Optional[bool] = None
    role_id: Optional[int] = None


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)
    username: Optional[str] = Field(default=None, max_length=255)
    phone_number: Optional[str] = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


class User(UserBase, table=True):
    hashed_password: str = Field(repr=False)
    role_id: Optional[int] = Field(default=None, foreign_key="role.id")

    tenant: Optional["Tenant"] = Relationship(back_populates="users")
    role: Optional["Role"] = Relationship(back_populates="users")


class UserPublic(UserBase):
    id: str
    role: Optional[RolePublic]


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int
