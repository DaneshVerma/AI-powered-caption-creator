from fastapi import FastAPI
from src.route.captionRoute import router as caption_router
app = FastAPI()

app.include_router(caption_router, prefix="/api")


@app.get("/")
async def read_root():
    return {"Hello": "World"}
