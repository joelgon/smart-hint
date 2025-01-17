from fastapi import APIRouter
from presentation.controllers.product_controller import ProductController
from infrastructure.database.repository.product_repository import ProductRepository
from infrastructure.bucket.pre_signed_url_put import PreSignedUrlPut
from application.create_product_use_case import CreateProductUseCase
from application.list_product_use_case import ListProductUseCase
from application.update_product_use_case import UpdateProductUseCase
from infrastructure.database.db import get_db

try:
    db = next(get_db())
    print("Conexão com o banco de dados está OK.")
except Exception as e:
    print(f"Erro ao conectar ao banco de dados: {e}")

product_repository = ProductRepository(db)
pre_signed_url_put = PreSignedUrlPut()
create_product_use_case = CreateProductUseCase(product_repository=product_repository, pre_signed_url_put=pre_signed_url_put)
list_product_use_case = ListProductUseCase(product_repository=product_repository)
update_product_use_case = UpdateProductUseCase(product_repository=product_repository)

product_controller = ProductController(create_product_use_case=create_product_use_case, list_product_use_case=list_product_use_case, update_product_use_case=update_product_use_case)

router = APIRouter()

router.include_router(product_controller.router, prefix="/api", tags=["Products"])