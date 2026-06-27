from datetime import datetime

from beanie import Document
from pydantic import EmailStr, Field
from pymongo import IndexModel

class User(Document):
    full_name: str
    email: EmailStr
    password: str

    # is_verified: bool = False
    # avatar: str | None = None

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "users"
        indexes = [IndexModel("email", unique=True)]
