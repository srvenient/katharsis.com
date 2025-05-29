from typing import Optional, List, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.api.product.model.product_models import Product
    from app.api.tenant.model.tenant_models import Tenant


class CategoryBase(SQLModel):
    name: str = Field(max_length=100, description="Category name")
    tenant_id: int = Field(foreign_key="tenant.id", index=True)


class Category(CategoryBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    tenant: Optional["Tenant"] = Relationship(back_populates="categories")
    products: List["Product"] = Relationship(back_populates="category")


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(SQLModel):
    name: Optional[str] = Field(default=None, max_length=100)
    tenant_id: Optional[int] = Field(default=None)


class CategoryPublic(CategoryBase):
    id: int


class CategoriesPublic(SQLModel):
    data: List[CategoryPublic]
    count: int
