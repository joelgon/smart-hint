from pydantic import BaseModel;
from decimal import Decimal;
from datetime import datetime;
from typing import Optional
from shared.enum.local_enum import LocalEnum

class ProductEntity(BaseModel):
    id: int;
    name: str;
    description: str;
    ean: str;
    image_url: Optional[str];
    price: Decimal;
    created_at: datetime;
    active: bool;
    local: LocalEnum;

class PartialProductEntity(BaseModel):
    name: Optional[str] = None;
    description: Optional[str] = None;
    image_url: Optional[str] = None;
    price: Optional[Decimal] = None;
    active: Optional[bool] = None;
    local: Optional[LocalEnum] = None;

class CreateProduct(BaseModel):
    data: ProductEntity;
    pre_signed_url: str;