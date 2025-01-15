from domain.interfaces.product_repository_interface import ProductRepositoryInterface;
from domain.entities.product_entity import ProductEntity
from domain.dto.list_query_params import ListQueryParams

class ListProductUseCase:
    def __init__(self, product_repository: ProductRepositoryInterface):
        self.product_repository = product_repository;

    def execute(self, query: ListQueryParams) -> list[ProductEntity]:
        return self.product_repository.findAll(query=query)