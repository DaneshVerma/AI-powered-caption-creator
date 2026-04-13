"""
Caption view — POST /api
Accepts multipart/form-data with an image or video file + caption options.
Returns { caption, media_url, media_type }.
Uploads media to Cloudinary for persistent storage.
"""

from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .middleware import jwt_auth_required
from .services import generate_caption
from .storage import upload_media


ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"}
ALLOWED_TYPES = ALLOWED_IMAGE_TYPES | ALLOWED_VIDEO_TYPES

MAX_IMAGE_SIZE = 10 * 1024 * 1024   # 10 MB
MAX_VIDEO_SIZE = 100 * 1024 * 1024  # 100 MB


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@jwt_auth_required
def caption_view(request):
    # Accept 'media' field, fallback to 'image' for backwards compat
    media_file = request.FILES.get("media") or request.FILES.get("image")

    if not media_file or media_file.size == 0:
        return Response(
            {"error": "No media file or an empty file was provided."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    content_type = media_file.content_type or "application/octet-stream"
    is_video = content_type.startswith("video/")

    # Validate file type
    if content_type not in ALLOWED_TYPES:
        return Response(
            {"error": f"Unsupported file type: {content_type}. Allowed: images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM, MOV, AVI)."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Validate file size
    max_size = MAX_VIDEO_SIZE if is_video else MAX_IMAGE_SIZE
    if media_file.size > max_size:
        limit_mb = max_size // (1024 * 1024)
        return Response(
            {"error": f"File too large. Maximum size is {limit_mb} MB."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        media_bytes = media_file.read()

        user_options = {
            "language": request.data.get("language", "English"),
            "mood": request.data.get("mood", "friendly"),
            "tone": request.data.get("tone", "engaging"),
            "emojis": request.data.get("emojis") == "true",
            "hashtags": request.data.get("hashtags") == "true",
        }

        # Generate caption with Gemini AI
        caption = generate_caption(media_bytes, content_type, user_options)

        # Upload to Cloudinary
        cloud_result = upload_media(media_bytes, content_type)

        return Response(
            {
                "caption": caption,
                "media_url": cloud_result["url"],
                "media_type": "video" if is_video else "image",
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as exc:
        print(f"Error creating caption: {exc}")
        return Response(
            {"error": "Failed to process media"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
