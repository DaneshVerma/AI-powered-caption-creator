from fastapi import APIRouter
from src.routes.authRoute import router as auth_routes
from src.routes.captionRoute import router as caption_routes

router = APIRouter()


router.include_router(auth_routes, prefix="/auth")
router.include_router(caption_routes, prefix="/caption")
