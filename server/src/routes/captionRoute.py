from fastapi import APIRouter, UploadFile, File, Form
from src.service.ai import ai
from src.schemas.caption import Tone, Language, Mood

routes = APIRouter()


@routes.post("/generate")
async def generate_caption(
    image: UploadFile = File(...),
    tone: Tone = Form(...),
    language: Language = Form(...),
    mood: Mood = Form(...),
):
    image_content = await image.read()

    caption = ai.generate_caption(
        image_bytes=image_content,
        tone=tone,
        mood=mood,
        language=language,
        mime_type=image.content_type or "image/jpg",
    )

    return {
        "success": True,
        "caption": caption,
    }
