from fastapi import APIRouter, Depends, Path
from domain.dto.create_product_dto import CreateProductDto
from domain.interfaces.create_product_interface import CreateProductInterface
from domain.interfaces.list_product_interface import ListProductInterface
from domain.entities.product_entity import CreateProduct;
from domain.dto.list_query_params import ListQueryParams;
from domain.interfaces.update_product_interface import UpdateProductInterface
class ProductController:
    def __init__(self, create_product_use_case: CreateProductInterface, list_product_use_case: ListProductInterface, update_product_use_case: UpdateProductInterface):
        self.router = APIRouter()
        self.create_product_use_case = create_product_use_case
        self.list_product_use_case = list_product_use_case
        self.update_product_use_case = update_product_use_case

        self.router.add_api_route("/products", self.list, methods=["GET"])
        self.router.add_api_route("/products", self.create, methods=["POST"])
        self.router.add_api_route("/products/{id}", self.update, methods=["PATCH"])

    async def list(self, query_params: ListQueryParams = Depends()):
        return self.list_product_use_case.execute(query_params);
    
    async def create(self, body: CreateProductDto) -> CreateProduct:
        return self.create_product_use_case.execute(body)
    
    async def update(self, body: CreateProductDto, id: int = Path(..., title="Product ID", description="The ID of the product to update")) -> None:
        self.update_product_use_case.execute(id, body);
        return