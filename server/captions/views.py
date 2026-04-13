"""
Caption view — POST /api
Accepts multipart/form-data with an image file + caption options.
Returns { caption, image (base64 data-URI) }.
Mirrors backend/src/controllers/caption.controller.js exactly.
"""

import base64

from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .middleware import jwt_auth_required
from .services import generate_caption


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@jwt_auth_required
def caption_view(request):
    print(f"Received caption request with data: {request.data} and files: {request.FILES}")
    image_file = request.FILES.get("image")

    if not image_file or image_file.size == 0:
        return Response(
            {"error": "No image file or an empty file buffer was provided."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        image_bytes = image_file.read()

        user_options = {
            "language": request.data.get("language", "English"),
            "mood": request.data.get("mood", "friendly"),
            "tone": request.data.get("tone", "engaging"),
            "emojis": request.data.get("emojis") == "true",
            "hashtags": request.data.get("hashtags") == "true",
        }

        caption = generate_caption(image_bytes, user_options)

        # Build the same base64 data-URI the Express backend returns.
        mime = image_file.content_type or "image/jpeg"
        b64_image = f"data:{mime};base64,{base64.b64encode(image_bytes).decode('ascii')}"

        return Response(
            {"caption": caption, "image": b64_image},
            status=status.HTTP_201_CREATED,
        )

    except Exception as exc:
        print(f"Error creating caption: {exc}")
        return Response(
            {"error": "Failed to create post"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
