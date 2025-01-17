from fastapi import HTTPException
from domain.interfaces.product_repository_interface import ProductRepositoryInterface
from domain.interfaces.pre_signed_url_interface import PreSignedUrlInterface
from domain.dto.create_product_dto import CreateProductDto
from domain.entities.product_entity import CreateProduct
import uuid

class CreateProductUseCase:
    def __init__(self, product_repository: ProductRepositoryInterface, pre_signed_url_put: PreSignedUrlInterface):
        self.product_repository = product_repository
        self.pre_signed_url_put = pre_signed_url_put

    def execute(self, body: CreateProductDto) -> CreateProduct:
        try:
            product = self.product_repository.findByEan(body.ean)

            if product:
                raise HTTPException(
                    status_code=412,
                    detail=f"Produto com EAN '{body.ean}' já existe."
                )
        
            generated_uuid = uuid.uuid4()
            url_meta = self.pre_signed_url_put.execute("my-bucket", f"{generated_uuid}.png", "png")

            product = self.product_repository.create(body, url=url_meta["url"])

            return CreateProduct(data=product, pre_signed_url=url_meta["pre_signed_url"])
        except Exception as e:
            print(e);
            raise
