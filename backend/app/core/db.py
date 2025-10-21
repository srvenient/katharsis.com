from app.api.role.domain.role_models import Role
from sqlmodel import create_engine, Session, SQLModel, select

from app.core.config import settings

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


def init_db(session: Session) -> None:
    existing_role = session.exec(select(Role).where(Role.name == "admin")).first()

    if not existing_role:
        admin_role = Role(name="admin", description="Administrator role with full permissions")
        session.add(admin_role)
        session.commit()
        session.refresh(admin_role)