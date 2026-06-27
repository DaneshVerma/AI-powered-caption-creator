from fastapi import FastAPI, staticfiles
from fastapi.responses import FileResponse
from src.routes.router import router
from src.core.handlers import register_exception_handlers
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from src.db.db import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
register_exception_handlers(app)

app.include_router(router, prefix="/api")

app.mount(
    "/assets",
    staticfiles.StaticFiles(directory="public/assets"),
    name="assets",
)


@app.get("/{path:path}")
async def spa(path: str):
    return FileResponse("public/index.html")
