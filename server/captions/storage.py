"""
Cloudinary upload helper.
Uploads images and videos and returns the secure URL.
"""

import cloudinary
import cloudinary.uploader
from django.conf import settings


_configured = False


def _ensure_config():
    global _configured
    if not _configured:
        cloudinary.config(
            cloud_name=settings.CLOUDINARY_CLOUD_NAME,
            api_key=settings.CLOUDINARY_API_KEY,
            api_secret=settings.CLOUDINARY_API_SECRET,
            secure=True,
        )
        _configured = True


def upload_media(file_bytes: bytes, content_type: str) -> dict:
    """
    Upload media bytes to Cloudinary.
    Returns dict with 'url' and 'resource_type' keys.
    """
    _ensure_config()

    is_video = content_type.startswith("video/")
    resource_type = "video" if is_video else "image"

    result = cloudinary.uploader.upload(
        file_bytes,
        resource_type=resource_type,
        folder="captionair",
    )

    return {
        "url": result["secure_url"],
        "resource_type": resource_type,
    }
