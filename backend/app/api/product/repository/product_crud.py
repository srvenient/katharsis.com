from sqlmodel import Session, select
from app.api.product.model.product_models import Product, ProductCreate, ProductUpdate


def create_product(*, session: Session, product_create: ProductCreate) -> Product:
    db_product = Product.model_validate(product_create)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product


def get_product_by_id(*, session: Session, product_id: int) -> Product | None:
    return session.get(Product, product_id)


def get_all_products(*, session: Session, tenant_id: int, skip: int = 0, limit: int = 100) -> list[Product]:
    statement = (
        select(Product)
        .where(Product.tenant_id == tenant_id)
        .offset(skip)
        .limit(limit)
        .order_by(Product.id)
    )
    return session.exec(statement).all()


def update_product(*, session: Session, product_id: int, product_update: ProductUpdate) -> Product | None:
    db_product = session.get(Product, product_id)
    if not db_product:
        return None

    product_data = product_update.dict(exclude_unset=True)
    for key, value in product_data.items():
        setattr(db_product, key, value)

    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product


def delete_product(*, session: Session, product_id: int) -> bool:
    db_product = session.get(Product, product_id)
    if not db_product:
        return False
    session.delete(db_product)
    session.commit()
    return True
