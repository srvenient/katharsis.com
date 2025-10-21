from app.api.shared.aggregate.infrastructure.repository.sql.sql_alchemy_aggregate_root_repository import \
    SQLAlchemyAggregateRootRepository

from app.api.role.domain.role_models import Role


class RoleService:
    def __init__(self, role_repo: SQLAlchemyAggregateRootRepository[Role]):
        self.role_repo = role_repo

    async def get_role_by_name(self, name: str) -> Role | None:
        return await self.role_repo.find_async(name=name)
