# app/api/shared/infrastructure/dependencies.py

from typing import Generator, Annotated
from fastapi import Depends, Request, HTTPException, status
from sqlmodel import Session

from app.core.db import engine
from app.api.role.application.role_service import RoleService
from app.api.user.application.auth_service import AuthService
from app.api.tenant.application.tenant_service import TenantService
from app.api.shared.aggregate.infrastructure.repository.sql.sql_alchemy_aggregate_root_repository import (
    SQLAlchemyAggregateRootRepository,
)
from app.api.user.domain.user_models import User
from app.api.role.domain.role_models import Role
from app.api.tenant.domain.tenant_models import Tenant

from app.api.shared.infrastructure.context import AppContext


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]


def get_user_repo(session: SessionDep):
    return SQLAlchemyAggregateRootRepository[User](session, User)


def get_role_repo(session: SessionDep):
    return SQLAlchemyAggregateRootRepository[Role](session, Role)


def get_tenant_repo(session: SessionDep):
    return SQLAlchemyAggregateRootRepository[Tenant](session, Tenant)


def get_role_service(role_repo=Depends(get_role_repo)) -> RoleService:
    return RoleService(role_repo)


def get_tenant_service(
        tenant_repo=Depends(get_tenant_repo),
) -> TenantService:
    return TenantService(tenant_repo)


def get_auth_service(
        user_repo=Depends(get_user_repo),
        role_service=Depends(get_role_service),
        tenant_service=Depends(get_tenant_repo)
) -> AuthService:
    return AuthService(user_repo, role_service, tenant_service)


async def get_app_context(
        request: Request,
        tenant_service: TenantService = Depends(get_tenant_service),
        role_service: RoleService = Depends(get_role_service),
        auth_service: AuthService = Depends(get_auth_service),
) -> AppContext:
    ctx = AppContext(
        tenant_service=tenant_service,
        role_service=role_service,
        auth_service=auth_service,
    )

    try:
        token = request.cookies.get("access_token")
        if token:
            user = await auth_service.get_current_user_from_token(token)
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid access token",
                )

            ctx.current_user = user
            ctx.current_tenant = await tenant_service.get_tenant_by_user(user)
    except Exception as e:
        print(e)
        ctx.current_tenant = None
        ctx.current_user = None

    return ctx


AppContextDep = Annotated[AppContext, Depends(get_app_context)]
