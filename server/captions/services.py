"""
Gemini AI caption generation — supports both images and videos.
Uses the official google-genai Python SDK.
"""

import base64
import tempfile
import os
import time
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
    "You are an expert in generating creative captions for images and videos.\n"
    "Always generate one concise caption describing the media accurately.\n"
    "The style must follow user preferences:\n"
    "- Language choice\n"
    "- Mood\n"
    "- Tone\n"
    "- Emoji inclusion\n"
    "- Hashtag inclusion\n"
    "If preferences are missing, default to short, simple, and friendly "
    "captions in English without emojis or hashtags."
)


def generate_caption(media_bytes: bytes, content_type: str, options: dict | None = None) -> str:
    """
    Send media (image or video) + user preferences to Gemini and return
    the caption text. Falls back to an error string on failure.
    """
    options = options or {}
    language = options.get("language", "English")
    mood = options.get("mood", "friendly")
    tone = options.get("tone", "engaging")
    emojis = options.get("emojis", False)
    hashtags = options.get("hashtags", False)

    is_video = content_type.startswith("video/")
    media_word = "video" if is_video else "image"

    prompt = (
        f"Generate a single caption for this {media_word}.\n"
        f"Preferences:\n"
        f"- Language: {language}\n"
        f"- Mood: {mood}\n"
        f"- Tone: {tone}\n"
        f"- Emojis: {'Yes' if emojis else 'No'}\n"
        f"- Hashtags: {'Yes' if hashtags else 'No'}\n"
    )

    try:
        client = _get_client()

        if is_video:
            # Videos need to be uploaded via the File API (too large for inline)
            ext = _ext_from_mime(content_type)
            with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
                tmp.write(media_bytes)
                tmp_path = tmp.name

            try:
                uploaded = client.files.upload(file=tmp_path)

                # Wait for processing
                while uploaded.state.name == "PROCESSING":
                    time.sleep(2)
                    uploaded = client.files.get(name=uploaded.name)

                contents = [uploaded, {"text": prompt}]
                response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=contents,
                    config={
                        "system_instruction": SYSTEM_INSTRUCTION,
                    },
                )
            finally:
                os.unlink(tmp_path)
        else:
            # Images can be sent inline as base64
            b64 = base64.standard_b64encode(media_bytes).decode("ascii")
            contents = [
                {
                    "inline_data": {
                        "mime_type": content_type or "image/jpeg",
                        "data": b64,
                    }
                },
                {"text": prompt},
            ]
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
        return f"Failed to generate caption for the {media_word}."


def _ext_from_mime(mime: str) -> str:
    """Map common video MIME types to file extensions."""
    mapping = {
        "video/mp4": ".mp4",
        "video/webm": ".webm",
        "video/quicktime": ".mov",
        "video/x-msvideo": ".avi",
        "video/x-matroska": ".mkv",
    }
    return mapping.get(mime, ".mp4")
