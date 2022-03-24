"""empty message

Revision ID: e71abf6e656f
Revises: 8ddb748eaa3c
Create Date: 2022-03-23 15:59:39.344419

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e71abf6e656f'
down_revision = '8ddb748eaa3c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('home', sa.Column('vin', sa.String(), nullable=True))
    op.drop_constraint('home_vi_key', 'home', type_='unique')
    op.create_unique_constraint(None, 'home', ['vin'])
    op.drop_column('home', 'vi')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('home', sa.Column('vi', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'home', type_='unique')
    op.create_unique_constraint('home_vi_key', 'home', ['vi'])
    op.drop_column('home', 'vin')
    # ### end Alembic commands ###
