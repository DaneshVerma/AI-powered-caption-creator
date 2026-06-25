from fastapi import FastAPI, staticfiles
from fastapi.responses import FileResponse
from src.routes.captionRoute import router as caption_router
from src.core.handlers import register_exception_handlers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
register_exception_handlers(app)

app.include_router(
    caption_router,
    prefix="/api",
)

app.mount(
    "/assets",
    staticfiles.StaticFiles(directory="public/assets"),
    name="assets",
)

@app.get("/{path:path}")
async def spa(path:str):
    return FileResponse("public/index.html")

