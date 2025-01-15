from fastapi import FastAPI
from presentation.routers.product_router import router as product_router
from infrastructure.database.migrate import run_migrations

run_migrations()

app = FastAPI()
app.include_router(product_router)