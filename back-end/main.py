from fastapi import FastAPI
from presentation.routers.product_router import router as product_router
from infrastructure.database.migrate import run_migrations
from fastapi.middleware.cors import CORSMiddleware

run_migrations()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)