from abc import ABC, abstractmethod
from domain.dto.create_product_dto import CreateProductDto
from domain.entities.product_entity import ProductEntity, PartialProductEntity
from domain.dto.list_query_params import ListQueryParams

class ProductRepositoryInterface(ABC):
    @abstractmethod
    def create(self, body: CreateProductDto, url: str) -> ProductEntity:
        pass;

    @abstractmethod
    def findById(self, id: int) -> ProductEntity:
        pass;
    
    @abstractmethod
    def findByEan(self, ean: str) -> ProductEntity:
        pass;

    @abstractmethod
    def findAll(self, query: ListQueryParams) -> list[ProductEntity]:
        pass;

    @abstractmethod
    def update(self, id: int, updates: PartialProductEntity) -> None:
        pass;

    @abstractmethod
    def delete(self, id: int) -> None:
        pass;