"""add products table

Revision ID: 7a4b41dd1b8b
Revises: 764bda187091
Create Date: 2025-05-27 21:46:32.476929

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes

# revision identifiers, used by Alembic.
revision = '7a4b41dd1b8b'
down_revision = '764bda187091'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'product',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('code', sa.String(length=20), nullable=False, index=True),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('purchase_price', sa.Float, nullable=False, server_default='0.0'),
        sa.Column('sale_price', sa.Float, nullable=False, server_default='0.0'),
        sa.Column('current_stock', sa.Integer, nullable=False, server_default='0'),
        sa.Column('minimum_stock', sa.Integer, nullable=False, server_default='0'),
        sa.Column('last_updated', sa.DateTime(), nullable=True),
    )


def downgrade():
    op.drop_table('product')
