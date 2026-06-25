from fastapi import APIRouter

routes = APIRouter()


@routes.get("/login")
async def getAuth():
    return {"message": "kya hua"}
