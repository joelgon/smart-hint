from abc import ABC, abstractmethod
from domain.dto.list_query_params import ListQueryParams;
from domain.entities.product_entity import ProductEntity;

class ListProductInterface(ABC):
    @abstractmethod
    def execute(query: ListQueryParams) -> list[ProductEntity]:
        pass