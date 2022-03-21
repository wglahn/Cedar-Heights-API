"""empty message

Revision ID: e4614374f566
Revises: 71fba79fc470
Create Date: 2022-03-19 12:34:09.448810

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'e4614374f566'
down_revision = '71fba79fc470'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('home', sa.Column('year', sa.Integer(), nullable=True))
    op.drop_column('home', 'sold_on')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('home', sa.Column('sold_on', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.drop_column('home', 'year')
    # ### end Alembic commands ###