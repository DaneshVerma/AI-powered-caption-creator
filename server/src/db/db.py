from beanie import init_beanie
from src.core.config import settings
from src.db.models.user import User
from pymongo import AsyncMongoClient


client = AsyncMongoClient(settings.MONGO_URI)
db = client[settings.DB_NAME]

async def init_db():
    await init_beanie(
        database=db,
        document_models=[User],
    )
    print("connected to db")
