import re
import uuid

import unicodedata

from app.api.shared.aggregate.infrastructure.repository.sql.sql_alchemy_aggregate_root_repository import \
    SQLAlchemyAggregateRootRepository
from app.api.tenant.domain.tenant_models import Tenant, TenantCreate
from app.api.user.domain.user_models import User


class TenantService:
    def __init__(self, tenant_repo: SQLAlchemyAggregateRootRepository[Tenant]):
        self.tenant_repo = tenant_repo

    @staticmethod
    def slugify(value: str) -> str:
        value = unicodedata.normalize('NFKD', value)
        value = value.encode('ascii', 'ignore').decode('ascii')
        value = re.sub(r'[^a-zA-Z0-9]+', '-', value)
        return value.strip('-').lower()

    async def get_tenant_by_user(self, user: User) -> Tenant | None:
        return await self.tenant_repo.find_async(id=user.tenant_id)

    async def create_tenant(self, user_id: uuid.UUID, tenant_create: TenantCreate) -> Tenant:
        pass
