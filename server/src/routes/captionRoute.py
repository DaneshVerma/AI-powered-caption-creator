from fastapi import APIRouter, UploadFile, File, Form, Depends
from src.service.ai import ai
from src.schemas.caption import CaptionOptions
from src.core.logger import logger

router = APIRouter()


@router.post("/generate")
async def generate_caption(
    image: UploadFile = File(...),
    options: CaptionOptions = Depends(CaptionOptions.as_form),
):
    image_content = await image.read()
    
    caption = ai.generate_caption(
        image_bytes=image_content,
        options=options,
        mime_type=image.content_type or "image/jpg",
    )

    return {
        "success": True,
        "caption": caption,
    }
