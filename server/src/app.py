from fastapi import FastAPI
from src.routes.captionRoute import router as caption_router
from src.core.handlers import register_exception_handlers

app = FastAPI()

register_exception_handlers(app)

app.include_router(
    caption_router,
    prefix="/api",
)
