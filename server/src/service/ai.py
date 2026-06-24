from google import genai
from src.core.config import settings


class AiService:
    def __init__(self) -> None:
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)

    def generate_caption(
        self,
        image_bytes: bytes,
        tone,
        mood,
        language,
        mime_type: str,
    ) -> str:

        prompt = f"""
        Analyze the image and generate a social media caption.

        Tone: {tone}
        Mood: {mood}
        Language: {language}

        Return only the caption.
        """

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                prompt,
                genai.types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=mime_type,
                ),
            ],
        )

        if response.text is None:
            raise ValueError("No caption generated")

        return response.text


ai = AiService()
