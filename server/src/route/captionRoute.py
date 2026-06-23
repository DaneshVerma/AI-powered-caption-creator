from fastapi import APIRouter

router = APIRouter()


@router.get("/caption")
async def get_caption():
    return {"caption": "This is a sample caption."}
