from beanie import init_beanie
from src.core.config import settings
from src.db.models.user import User
from pymongo import AsyncMongoClient
from src.core.logger import logger

client = AsyncMongoClient(settings.MONGO_URI)
db = client[settings.DB_NAME]


async def init_db():
    try:
        await init_beanie(
            database=db,
            document_models=[User],
        )
        logger.info("MongoDB connected successfully")
    except Exception as e:
        logger.error(str(e))
