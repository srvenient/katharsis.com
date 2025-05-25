from sqlmodel import create_engine, Session, select

from app.api.user.model.user_models import Role
from app.core.config import settings

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next lines
    # from sqlmodel import SQLModel

    # This works because the models are already imported and registered from app.models
    # SQLModel.metadata.create_all(engine)
    existing_admin = session.exec(select(Role).where(Role.name == "admin")).first()

    if not existing_admin:
        admin_role = Role(name="admin", description="Administrador del sistema")
        session.add(admin_role)
        session.commit()
        session.refresh(admin_role)
        print(f"Rol 'admin' creado con ID: {admin_role.id}")
    else:
        print("El rol 'admin' ya existe.")
