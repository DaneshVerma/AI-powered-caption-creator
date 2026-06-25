from google import genai
from fastapi import HTTPException
from google.genai import types, errors
from src.core.config import settings
from src.core.exceptions import GeminiServiceError


class AiService:
    def __init__(self) -> None:
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)

    def generate_caption(
        self,
        image_bytes: bytes,
        tone: str,
        mood: str,
        language: str,
        mime_type: str,
    ) -> str:

        prompt = f"""
        Analyze this image and generate an engaging social media caption.

        Requirements:
        - Tone: {tone}
        - Mood: {mood}
        - Language: {language}
        - Maximum 100 words
        - Return only the caption text
        """

        try:
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    prompt,
                    types.Part.from_bytes(
                        data=image_bytes,
                        mime_type=mime_type,
                    ),
                ],
            )
            if not response.text:
                raise GeminiServiceError(
                    message="Gemini returned empty response", status_code=506
                )

            return response.text.strip()

        except errors.ClientError as e:
            print(e.message)
            raise GeminiServiceError(
                message="AI connection Faild Try after Some time",
                status_code=502,
            )
        except errors.ServerError:
            raise GeminiServiceError(
                message="Failed to communicate with Ai",
                status_code=501,
            )
        except errors.APIError:
            raise GeminiServiceError(
                message="AI API faild",
                status_code=504,
            )


ai = AiService()
