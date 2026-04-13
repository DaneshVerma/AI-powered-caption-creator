"""
Auth views — exact same endpoints & response shapes as the Express backend.

POST /auth/register   { username, email, password } → sets cookie, returns user
POST /auth/login      { username, password }        → sets cookie, returns message
"""

import jwt
from datetime import datetime, timedelta, timezone

from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import User


def _make_token(user: User) -> str:
    """Create a JWT identical to the Express one: payload { id: <pk> }."""
    payload = {
        "id": str(user.pk),
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")


def _set_token_cookie(response: Response, token: str) -> Response:
    """
    Set the `token` cookie.  NOT httpOnly — the React frontend reads it
    via js-cookie for its auth guard / navbar.
    """
    response.set_cookie(
        key="token",
        value=token,
        max_age=7 * 24 * 60 * 60,    # 7 days
        httponly=False,                # frontend needs to read it
        samesite="Lax",
        secure=False,                 # flip True behind HTTPS in prod
        path="/",
    )
    return response


# ── Register ──────────────────────────────────────────
@api_view(["POST"])
def register_view(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"message": "username and password are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"message": "username already exist"},
            status=status.HTTP_409_CONFLICT,
        )

    try:
        user = User(username=username, email=email or None)
        user.set_password(password)
        user.save()

        token = _make_token(user)
        response = Response(
            {"message": "user created succesfully", "newUser": user.to_dict()},
            status=status.HTTP_200_OK,
        )
        return _set_token_cookie(response, token)

    except Exception as exc:
        return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)


# ── Login ─────────────────────────────────────────────
@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"message": "invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(
            {"message": "user does not exist Register First!"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if not user.check_password(password):
        return Response(
            {"message": "username or password is incorrect"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    token = _make_token(user)
    response = Response(
        {"message": "logged in succesfully"},
        status=status.HTTP_200_OK,
    )
    return _set_token_cookie(response, token)
