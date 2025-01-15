from sqlalchemy import Column, String, Numeric, BigInteger, DateTime, func, Boolean, Enum
from infrastructure.database.db import Base
from shared.enum.local_enum import LocalEnum

class ProductModel(Base):
    __tablename__ = "tb_products";

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True);
    name = Column(String(150), nullable=False);
    description = Column(String(250), nullable=False);
    image_url = Column(String(2048), nullable=True, default=None);
    ean = Column(String(13), nullable=False, unique=True);
    price = Column(Numeric(25, 2), nullable=False);
    active = Column(Boolean, nullable=False, default=True);
    local = Column(Enum(LocalEnum), nullable=False)
    created_at = Column(DateTime(True), nullable=False, default=func.now());