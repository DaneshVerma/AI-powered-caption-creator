from fastapi import APIRouter
from src.schemas.caption import CaptionRequest

router = APIRouter()

router = APIRouter()


@router.post("/generate")
async def generate_caption(payload: CaptionRequest):
    print(f"Received request: {payload}")

    return {
        "status": "success",
        "data": {
            "caption": f"Generated caption for the uploaded image with tone '{payload.tone}', language '{payload.language}', and mood '{payload.mood}'."
        },
    }
