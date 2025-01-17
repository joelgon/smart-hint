"""populating database

Revision ID: f80a792c2dba
Revises: 45f9387936db
Create Date: 2025-01-16 13:34:55.865162

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column
import datetime


# revision identifiers, used by Alembic.
revision: str = 'f80a792c2dba'
down_revision: Union[str, None] = '45f9387936db'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    tb_products = table(
        'tb_products',
        column('id', sa.BigInteger()),
        column('name', sa.String(length=150)),
        column('description', sa.String(length=250)),
        column('image_url', sa.String(length=2048)),
        column('ean', sa.String(length=13)),
        column('price', sa.Numeric(precision=25, scale=2)),
        column('active', sa.Boolean()),
        column('local', sa.String(length=10)),
        column('created_at', sa.DateTime(timezone=True))
    )
    image_url = "https://i.pinimg.com/originals/33/4f/fb/334ffb9debba0e218f7359fd1d1a9910.jpg"

    product_names = [
        "Café Expresso", "Café Latte", "Café Mocha", "Cappuccino", "Café Americano",
        "Macchiato", "Flat White", "Café Gelado", "Café com Leite", "Affogato",
        "Café Irlandês", "Café Turco", "Café Cortado", "Ristretto", "Café Breve",
        "Café Bombom", "Café Lungo", "Café Cubano", "Café Vienense", "Café Árabe",
        "Espresso Romano", "Café Brasileiro", "Café Frappé", "Café de Coado",
        "Café Gourmet", "Café Orgânico", "Café Decaf", "Café com Chocolate",
        "Café com Caramelo", "Café com Baunilha", "Café com Chantilly", "Café Forte",
        "Café com Especiarias", "Café Especial", "Café do Dia", "Café Espresso Duplo",
        "Café com Canela", "Café com Cardamomo", "Café com Mel", "Café com Amêndoas"
    ]

    op.bulk_insert(
        tb_products,
        [
            {
                "name": product_names[i % len(product_names)],
                "description": f"Uma deliciosa xícara de {product_names[i % len(product_names)]}. Perfeito para qualquer momento do dia.",
                "image_url": image_url,
                "ean": f"{str(i + 1).zfill(13)}",
                "price": round(5 + (i * 0.5), 2),
                "active": True,
                "local": "event" if i % 2 == 0 else "store",
                "created_at": datetime.datetime.now(datetime.timezone.utc)
            }
            for i in range(40)
        ]
    )


def downgrade() -> None:
    op.execute("DELETE FROM tb_products WHERE id <= 40")
