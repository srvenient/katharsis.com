from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class ProductBase(SQLModel):
    code: str = Field(max_length=20, index=True)
    name: str = Field(max_length=100)
    description: Optional[str] = None
    purchase_price: float = Field(default=0.0, ge=0, description="Buy price")
    sale_price: float = Field(default=0.0, ge=0, description="Sell price")
    current_stock: int = Field(default=0, ge=0)
    minimum_stock: int = Field(default=0, ge=0)
    last_updated: Optional[datetime] = None


class Product(ProductBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class ProductPublic(ProductBase):
    id: int


class ProductsPublic(SQLModel):
    data: list[ProductPublic] = Field(default_factory=list)
    count: int = Field(default=0, ge=0, description="Total number of products")


class ProductCreate(ProductBase):
    pass  # Todos los campos necesarios ya están en ProductBase


class ProductUpdate(SQLModel):
    code: Optional[str] = Field(default=None, max_length=20)
    name: Optional[str] = Field(default=None, max_length=100)
    description: Optional[str] = None
    purchase_price: Optional[float] = Field(default=None, ge=0)
    sale_price: Optional[float] = Field(default=None, ge=0)
    current_stock: Optional[int] = Field(default=None, ge=0)
    minimum_stock: Optional[int] = Field(default=None, ge=0)
    last_updated: Optional[datetime] = None
