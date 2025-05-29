from datetime import datetime
from typing import List

from sqlmodel import SQLModel, Field, Relationship

from app.api.category.model.category_models import Category
from app.api.product.model.product_models import Product
from app.api.user.model.user_models import User


class Tenant(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    users: List["User"] = Relationship(back_populates="tenant")
    categories: List["Category"] = Relationship(back_populates="tenant")
    products: List["Product"] = Relationship(back_populates="tenant")
