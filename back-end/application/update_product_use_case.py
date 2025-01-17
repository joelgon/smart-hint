from domain.interfaces.product_repository_interface import ProductRepositoryInterface
from domain.dto.create_product_dto import CreateProductDto

class UpdateProductUseCase:
    def __init__(self, product_repository: ProductRepositoryInterface):
        self.product_repository = product_repository

    def execute(self, id: int, body: CreateProductDto) -> None:
        self.product_repository.update(id, body)

        return
