from domain.interfaces.product_repository_interface import ProductRepositoryInterface
from domain.interfaces.pre_signed_url_interface import PreSignedUrlInterface
from domain.dto.create_product_dto import CreateProductDto

class UpdateProductUseCase:
    def __init__(self, product_repository: ProductRepositoryInterface):
        self.product_repository = product_repository

    def execute(self, id: int, body: CreateProductDto) -> None:
        print('chegou aki isso ta certo')
        self.product_repository.update(id, body)

        return
