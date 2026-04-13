"""
Gemini AI caption generation — mirrors the Express ai.service.js exactly.
Uses the official google-genai Python SDK.
"""

import base64
from google import genai
from django.conf import settings


# Lazy client — created on first call so settings are loaded.
_client = None


def _get_client():
    global _client
    if _client is None:
        _client = genai.Client(api_key=settings.GEMINI_API_KEY)
    return _client


SYSTEM_INSTRUCTION = (
    "You are an expert in generating creative captions for images.\n"
    "Always generate one concise caption describing the image accurately.\n"
    "The style must follow user preferences:\n"
    "- Language choice\n"
    "- Mood\n"
    "- Tone\n"
    "- Emoji inclusion\n"
    "- Hashtag inclusion\n"
    "If preferences are missing, default to short, simple, and friendly "
    "captions in English without emojis or hashtags."
)


def generate_caption(image_bytes: bytes, options: dict | None = None) -> str:
    """
    Send *image_bytes* + user preferences to Gemini and return the caption
    text.  Falls back to an error string on failure (mirrors Express).
    """
    options = options or {}
    language = options.get("language", "English")
    mood = options.get("mood", "friendly")
    tone = options.get("tone", "engaging")
    emojis = options.get("emojis", False)
    hashtags = options.get("hashtags", False)

    b64 = base64.standard_b64encode(image_bytes).decode("ascii")

    prompt = (
        f"Generate a single caption for this image.\n"
        f"Preferences:\n"
        f"- Language: {language}\n"
        f"- Mood: {mood}\n"
        f"- Tone: {tone}\n"
        f"- Emojis: {'Yes' if emojis else 'No'}\n"
        f"- Hashtags: {'Yes' if hashtags else 'No'}\n"
    )

    contents = [
        {
            "inline_data": {
                "mime_type": "image/jpeg",
                "data": b64,
            }
        },
        {"text": prompt},
    ]

    try:
        client = _get_client()
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config={
                "system_instruction": SYSTEM_INSTRUCTION,
            },
        )
        return response.text
    except Exception as exc:
        print(f"Error calling Gemini API: {exc}")
        return "Failed to generate caption for the image."
