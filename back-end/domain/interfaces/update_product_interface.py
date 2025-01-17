from abc import ABC, abstractmethod
from domain.dto.create_product_dto import CreateProductDto;

class UpdateProductInterface(ABC):
    @abstractmethod
    def execute(id: int, body: CreateProductDto) -> None:
        pass