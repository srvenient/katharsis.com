from fastapi import APIRouter, HTTPException, status
from sqlmodel import Session

from app.api.deps import CurrentUser, SessionDep
from app.api.product.model.product_models import (
    ProductCreate,
    ProductUpdate,
    ProductPublic,
    ProductsPublic,
)
from app.api.product.repository.product_crud import (
    create_product,
    get_product_by_id,
    get_all_products,
    update_product,
    delete_product,
)

router = APIRouter(prefix="/products", tags=["products"])


@router.post("/", response_model=ProductPublic, status_code=status.HTTP_201_CREATED)
def create_product_view(
        product_in: ProductCreate,
        session: SessionDep,
        user: CurrentUser
):
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    return create_product(session=session, product_create=product_in)


@router.get("/{product_id}", response_model=ProductPublic)
def read_product_by_id(
        product_id: int,
        session: SessionDep,
        user: CurrentUser
):
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    product = get_product_by_id(session=session, product_id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.get("/", response_model=ProductsPublic)
def read_all_products(
        session: SessionDep,
        skip: int = 0,
        limit: int = 100,
):
    products = get_all_products(session=session, skip=skip, limit=limit)
    return {"data": products, "count": len(products)}


@router.put("/{product_id}", response_model=ProductPublic)
def update_product_view(
        product_id: int,
        product_in: ProductUpdate,
        session: SessionDep,
        user: CurrentUser
):
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    product = update_product(session=session, product_id=product_id, product_update=product_in)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product_view(
        product_id: int,
        session: SessionDep,
        user: CurrentUser
):
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    deleted = delete_product(session=session, product_id=product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
