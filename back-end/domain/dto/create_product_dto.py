from pydantic import BaseModel, Field, field_validator
from decimal import Decimal
from shared.enum.local_enum import LocalEnum

class CreateProductDto(BaseModel):
    name: str = Field(
        ...,
        max_length=150,
        description="Name of the product (max 150 characters)."
    )
    description: str = Field(
        ...,
        max_length=250,
        description="Detailed description of the product (max 250 characters)."
    )
    ean: str = Field(
        ...,
        pattern=r"^\d{13}$",
        description="EAN must be exactly 13 digits (numeric string).",
    )
    price: Decimal = Field(
        ...,
        description="Price of the product with up to 25 digits in the integer part and up to 2 decimal places.",
        example="9999999999999999999999999.99"
    )
    local: LocalEnum = Field(..., description="place of sale", example=f"'{LocalEnum.event}', '{LocalEnum.store}'")
    active: bool = Field(..., description="status", example=True)

    @field_validator("price")
    def validate_price(cls, value):
        parts = str(value).split(".")
        if len(parts[0]) > 25:
            raise ValueError("The integer part of the price must have at most 25 digits.")
        if len(parts) > 1 and len(parts[1]) > 2:
            raise ValueError("The decimal part of the price must have at most 2 digits.")
        return value
