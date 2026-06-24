from enum import Enum
from pydantic import BaseModel


class Language(str, Enum):
    HINGLISH = "hinglish"
    ENGLISH = "english"
    HINDI = "hindi"
    URDU = "urdu"
    PUNJABI = "punjabi"
    BANGLA = "bangla"
    TAMIL = "tamil"
    TELUGU = "telugu"
    GUJARATI = "gujarati"
    MARATHI = "marathi"


class Tone(str, Enum):
    FUNNY = "funny"
    WITTY = "witty"
    SARCASTIC = "sarcastic"
    INSPIRATIONAL = "inspirational"
    EMOTIONAL = "emotional"
    ROMANTIC = "romantic"
    PROFESSIONAL = "professional"
    FRIENDLY = "friendly"
    CASUAL = "casual"
    CLEVER = "clever"
    FORMAL = "formal"
    ENGAGING = "engaging"
    SERIOUS = "serious"
    POLITE = "polite"
    DIRECT = "direct"
    AUTHORITY = "authoritative"
    OPTIMISTIC = "optimistic"


class Mood(str, Enum):
    Casual = "casual"
    Sarcastic = "sarcastic"
    Romantic = "romantic"
    Inspirational = "inspirational"
    Trending = "trending"
    Emotional = "emotional"
    Aesthetic = "aesthetic"
    Witty = "witty"
    Storytelling = "storytelling"
    Informative = "informative"


class CaptionRequest(BaseModel):
    tone: Tone
    language: Language
    mood: Mood
