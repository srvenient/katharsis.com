from typing import List

from fastapi import APIRouter, HTTPException

from app.api.category.model.category_models import CategoryCreate, CategoryPublic, CategoryUpdate
from app.api.category.repository.category_crud import create_category, get_categories, get_category_by_id, \
    update_category, delete_category
from app.api.deps import SessionDep, CurrentUser

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.post("/", response_model=CategoryPublic)
def create_new_category(
        category_in: CategoryCreate,
        session: SessionDep,
        current_user: CurrentUser
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    category_in.tenant_id = current_user.tenant_id
    return create_category(session=session, category_in=category_in)


@router.get("/", response_model=List[CategoryPublic])
def list_categories(
        session: SessionDep,
        current_user: CurrentUser,
        skip: int = 0,
        limit: int = 100
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    return get_categories(session=session, tenant_id=current_user.tenant_id, skip=skip, limit=limit)


@router.get("/{category_id}", response_model=CategoryPublic)
def get_category(
        category_id: int,
        session: SessionDep,
        current_user: CurrentUser
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    category = get_category_by_id(session=session, category_id=category_id, tenant_id=current_user.tenant_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.put("/{category_id}", response_model=CategoryPublic)
def update_category_by_id(
        category_id: int,
        category_in: CategoryUpdate,
        session: SessionDep,
        current_user: CurrentUser
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    category = get_category_by_id(session=session, category_id=category_id, tenant_id=current_user.tenant_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return update_category(session=session, category_db=category, category_in=category_in)


@router.delete("/{category_id}", status_code=204)
def delete_category_by_id(
        category_id: int,
        session: SessionDep,
        current_user: CurrentUser
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    category = get_category_by_id(session=session, category_id=category_id, tenant_id=current_user.tenant_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    delete_category(session=session, category_db=category)
