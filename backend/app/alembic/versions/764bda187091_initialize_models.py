"""initialize models (base tables without circular FK)

Revision ID: 764bda187091
Revises:
Create Date: 2025-05-25 21:09:41.279087
"""

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes

# revision identifiers
revision = '764bda187091'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # --- Roles ---
    op.create_table(
        'roles',
        sa.Column('id', sa.Uuid(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False, unique=True, index=True),
        sa.Column('description', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    )

    # --- Users ---
    op.create_table(
        'users',
        sa.Column('id', sa.Uuid(as_uuid=True), primary_key=True, nullable=False),
        sa.Column(
            'doc_type',
            sa.Enum(
                'ID_CARD', 'FOREIGN_ID', 'PASSPORT', 'CITIZEN_CARD', 'TAX_ID',
                name='documenttype',
                create_type=True
            ),
            nullable=False,
            server_default='ID_CARD'
        ),
        sa.Column('doc_number', sqlmodel.sql.sqltypes.AutoString(length=20), nullable=False),
        sa.Column('email', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False, index=True),
        sa.Column('full_name', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True),

        sa.Column('role_id', sa.Uuid(as_uuid=True), sa.ForeignKey('roles.id', ondelete="SET NULL"), nullable=True),

        sa.Column('is_active', sa.Boolean(), nullable=False, server_default=sa.text('true')),
        sa.Column('is_superuser', sa.Boolean(), nullable=False, server_default=sa.text('false')),

        sa.Column('hashed_password', sqlmodel.sql.sqltypes.AutoString(), nullable=False),

        sa.Column('is_2fa_enabled', sa.Boolean(), nullable=False, server_default=sa.text('false')),
        sa.Column('otp_secret', sqlmodel.sql.sqltypes.AutoString(), nullable=True),

        sa.Column('last_login', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )


def downgrade():
    op.drop_table('users')
    op.drop_table('roles')
    op.execute('DROP TYPE IF EXISTS documenttype CASCADE;')
