from sqlalchemy import asc, desc
from sqlalchemy.orm import Session
from infrastructure.database.model.product_model import ProductModel
from domain.dto.create_product_dto import CreateProductDto
from domain.dto.list_query_params import ListQueryParams
from shared.enum.sort_enum import SortOrderEnum
from domain.entities.product_entity import ProductEntity, PartialProductEntity


class ProductRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, body: CreateProductDto, url: str) -> ProductEntity:
        new_product = ProductModel(**body.model_dump())
        new_product.image_url = url

        self.db.add(new_product)
        self.db.commit()
        self.db.refresh(new_product)

        return ProductEntity(**vars(new_product))

    def findById(self, id: int) -> ProductEntity:
        product_model = self.db.query(ProductModel).filter(ProductModel.id == id).first()
        return ProductEntity(**vars(product_model)) if product_model else None

    def findAll(self, query: ListQueryParams) -> list[ProductEntity]:
        order = asc(ProductModel.id) if query.sort == SortOrderEnum.ASC else desc(ProductModel.id)
        product_models = self.db.query(ProductModel).order_by(order).offset(query.offset()).limit(query.limit).all()

        return [ProductEntity(**vars(product)) for product in product_models]

    def findByEan(self, ean: str) -> ProductEntity:
        product_model = self.db.query(ProductModel).filter(ProductModel.ean == ean).first()
        return ProductEntity(**vars(product_model)) if product_model else None

    def update(self, id: int, updates: PartialProductEntity) -> None:
        print("chega no update")
        try:
            self.db.query(ProductModel).filter(ProductModel.id == id).update(updates)
            self.db.commit()
        except Exception as e:
            self.db.rollback()
            print(f"Erro ao atualizar produto: {e}")
            raise

    def delete(self, id: int) -> None:
        try:
            self.db.query(ProductModel).filter(ProductModel.id == id).delete()
            self.db.commit()
        except Exception as e:
            self.db.rollback()
            print(f"Erro ao deletar produto: {e}")
            raise
