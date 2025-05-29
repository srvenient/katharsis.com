from datetime import datetime
from enum import Enum
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.api.category.model.category_models import Category
    from app.api.tenant.model.tenant_models import Tenant


class CurrencyType(str, Enum):
    COP = "COP"
    USD = "USD"
    EUR = "EUR"


class ProductBase(SQLModel):
    code: str = Field(max_length=20, index=True)
    name: str = Field(max_length=100)
    description: Optional[str] = None
    purchase_price: float = Field(default=0.0, ge=0, description="Buy price")
    sale_price: float = Field(default=0.0, ge=0, description="Sell price")
    currency: CurrencyType = Field(default=CurrencyType.COP, description="Currency type")
    current_stock: int = Field(default=0, ge=0)
    minimum_stock: int = Field(default=0, ge=0)
    last_updated: Optional[datetime] = None
    category_id: Optional[int] = Field(default=None, foreign_key="category.id", description="Category ID")


class Product(ProductBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tenant_id: int = Field(foreign_key="tenant.id", index=True)

    tenant: Optional["Tenant"] = Relationship(back_populates="products")
    category: Optional["Category"] = Relationship(back_populates="products")


class ProductPublic(ProductBase):
    id: int
    tenant_id: int


class ProductsPublic(SQLModel):
    data: list[ProductPublic] = Field(default_factory=list)
    count: int = Field(default=0, ge=0, description="Total number of products")


class ProductCreate(ProductBase):
    tenant_id: int


class ProductUpdate(SQLModel):
    code: Optional[str] = Field(default=None, max_length=20)
    name: Optional[str] = Field(default=None, max_length=100)
    description: Optional[str] = None
    purchase_price: Optional[float] = Field(default=None, ge=0)
    sale_price: Optional[float] = Field(default=None, ge=0)
    currency: Optional[CurrencyType] = Field(default=None)
    current_stock: Optional[int] = Field(default=None, ge=0)
    minimum_stock: Optional[int] = Field(default=None, ge=0)
    last_updated: Optional[datetime] = None
    category_id: Optional[int] = None
