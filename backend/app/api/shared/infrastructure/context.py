from dataclasses import dataclass
from typing import Optional

from app.api.tenant.domain.tenant_models import Tenant
from app.api.user.domain.user_models import User

from app.api.role.application.role_service import RoleService
from app.api.tenant.application.tenant_service import TenantService
from app.api.user.application.auth_service import AuthService


@dataclass
class AppContext:
    tenant_service: TenantService
    role_service: RoleService
    auth_service: AuthService

    current_user: Optional[User] = None
    current_tenant: Optional[Tenant] = None