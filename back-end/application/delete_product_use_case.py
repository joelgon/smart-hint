from domain.interfaces.product_repository_interface import ProductRepositoryInterface

class DeleteProductUseCase:
    def __init__(self, product_repository: ProductRepositoryInterface):
        self.product_repository = product_repository
    
    def execute(self, id: int) -> None:
        self.product_repository.delete(id)
        return