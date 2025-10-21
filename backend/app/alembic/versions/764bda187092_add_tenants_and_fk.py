"""add tenants and user-tenant relations

Revision ID: 764bda187092
Revises: 764bda187091
Create Date: 2025-05-26 12:00:00
"""

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


revision = '764bda187092'
down_revision = '764bda187091'
branch_labels = None
depends_on = None


def upgrade():
    # --- Tenants ---
    op.create_table(
        'tenants',
        sa.Column('id', sa.Uuid(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False),
        sa.Column('slug', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False, unique=True, index=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default=sa.text('true')),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )

    # --- Add tenant_id FK to users ---
    op.add_column('users', sa.Column('tenant_id', sa.Uuid(as_uuid=True), sa.ForeignKey('tenants.id'), nullable=True))
    op.create_unique_constraint('uq_users_tenant_email', 'users', ['tenant_id', 'email'])

    # --- Add owner_id FK to tenants (circular dependency) ---
    op.add_column('tenants', sa.Column('owner_id', sa.Uuid(as_uuid=True), sa.ForeignKey('users.id'), nullable=False))


def downgrade():
    op.drop_constraint('uq_users_tenant_email', 'users', type_='unique')
    op.drop_column('users', 'tenant_id')
    op.drop_table('tenants')
