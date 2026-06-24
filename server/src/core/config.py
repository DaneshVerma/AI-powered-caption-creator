from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PORT: int = 3000
    DEBUG: bool = True
    GEMINI_API_KEY: str = "your_gemini_api_key_here"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
