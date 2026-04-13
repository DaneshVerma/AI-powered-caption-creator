"""
JWT authentication middleware — reads the `token` cookie and attaches
the user to `request.user`.  Mirrors backend/src/middlewares/auth.middleware.js.
"""

import jwt
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status as http_status

from accounts.models import User


def jwt_auth_required(view_fn):
    """Decorator that enforces JWT cookie auth before calling the view."""

    def wrapper(request, *args, **kwargs):
        token = request.COOKIES.get("token")
        if not token:
            return Response(
                {"message": "unauthorized!!"},
                status=http_status.HTTP_401_UNAUTHORIZED,
            )
        try:
            payload = jwt.decode(
                token, settings.JWT_SECRET, algorithms=["HS256"]
            )
            user = User.objects.get(pk=payload["id"])
            request.user = user
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            return Response(
                {"message": "invalid token please login again"},
                status=http_status.HTTP_401_UNAUTHORIZED,
            )
        except User.DoesNotExist:
            return Response(
                {"message": "invalid token please login again"},
                status=http_status.HTTP_401_UNAUTHORIZED,
            )
        return view_fn(request, *args, **kwargs)

    return wrapper
