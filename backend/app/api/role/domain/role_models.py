from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.api.user.domain.user_models import User


class RoleBase(SQLModel):
    name: str = Field(unique=True, index=True, max_length=255)
    description: str | None = Field(default=None, nullable=True)


class Role(RoleBase, table=True):
    __tablename__ = "roles"

    id: UUID = Field(default_factory=uuid4, nullable=False, primary_key=True)

    users: list["User"] = Relationship(back_populates="role")


class RolePublic(RoleBase):
    id: UUID


class RolesPublic(BaseModel):
    roles: list[RolePublic]
    count: int


from app.api.user.domain import user_models  # noqa: F401
