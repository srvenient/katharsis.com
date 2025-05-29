from typing import List, Optional
from sqlmodel import Session, select
from app.api.category.model.category_models import Category, CategoryCreate, CategoryUpdate


def create_category(*, session: Session, category_in: CategoryCreate) -> Category:
    category = Category.from_orm(category_in)
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


def get_category_by_id(*, session: Session, category_id: int, tenant_id: int) -> Optional[Category]:
    statement = select(Category).where(Category.id == category_id, Category.tenant_id == tenant_id)
    return session.exec(statement).first()


def get_categories(*, session: Session, tenant_id: int, skip: int = 0, limit: int = 100) -> List[Category]:
    statement = (
        select(Category)
        .where(Category.tenant_id == tenant_id)
        .offset(skip)
        .limit(limit)
        .order_by(Category.name)
    )
    return session.exec(statement).all()


def update_category(
    *, session: Session, category_db: Category, category_in: CategoryUpdate
) -> Category:
    category_data = category_in.dict(exclude_unset=True)
    for key, value in category_data.items():
        setattr(category_db, key, value)
    session.add(category_db)
    session.commit()
    session.refresh(category_db)
    return category_db


def delete_category(*, session: Session, category_db: Category) -> None:
    session.delete(category_db)
    session.commit()
