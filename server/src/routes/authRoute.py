from fastapi import APIRouter, status

from src.schemas.auth import RegisterReq
from src.service.auth import auth_service

router = APIRouter()


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
)
async def register(payload: RegisterReq):
    user = await auth_service.register_user(payload)

    return {
        "success": True,
        "message": "User registered successfully.",
        "user": user,
    }
