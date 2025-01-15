from abc import ABC, abstractmethod
from domain.dto.create_product_dto import CreateProductDto;
from domain.entities.product_entity import ProductEntity;

class CreateProductInterface(ABC):
    @abstractmethod
    def execute(body: CreateProductDto) -> ProductEntity:
        pass