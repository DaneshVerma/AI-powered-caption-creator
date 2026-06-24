from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse

from src.core.exceptions import AppException


def register_exception_handlers(app: FastAPI):
    app.add_exception_handler(AppException, app_exception_handler)  # type: ignore[arg-type]
    app.add_exception_handler(
        Exception,
        global_exception_handler,
    )


async def app_exception_handler(
    _request: Request,
    exc: AppException,
):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.message,
        },
    )


async def global_exception_handler(
    request: Request,
    exc: Exception,
):
    print(exc)

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal server error",
        },
    )
