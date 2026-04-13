"""
Django settings — drop-in replacement for the Express backend.
Loads secrets from .env via python-dotenv.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# ── Paths ──────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent          # server/
PROJECT_ROOT = BASE_DIR.parent                              # repo root

load_dotenv(BASE_DIR / ".env")                              # server/.env

# ── Core ───────────────────────────────────────────────
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "insecure-dev-key-change-me")
DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes")
ALLOWED_HOSTS = ["*"]                                       # tighten in prod

# ── Apps ───────────────────────────────────────────────
INSTALLED_APPS = [
    # Django built-ins
    "django.contrib.auth",
    "django.contrib.contenttypes",
    # Third-party
    "rest_framework",
    "corsheaders",
    # Project apps
    "accounts",
    "captions",
]

# ── Middleware ─────────────────────────────────────────
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

# ── CORS ───────────────────────────────────────────────
# In production the SPA is served from the same origin, so CORS is not
# strictly needed.  For local Vite dev-server (port 5173) we allow it.
CORS_ALLOW_ALL_ORIGINS = DEBUG
CORS_ALLOW_CREDENTIALS = True

# ── URL / WSGI ─────────────────────────────────────────
ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

# ── Database (SQLite — only stores User rows) ─────────
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ── Auth ───────────────────────────────────────────────
# We do NOT set AUTH_USER_MODEL because our User is a plain models.Model
# (not AbstractBaseUser).  JWT auth is handled manually.

# ── DRF ────────────────────────────────────────────────
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [],   # we handle JWT ourselves
    "DEFAULT_PERMISSION_CLASSES": [],
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.MultiPartParser",
        "rest_framework.parsers.FormParser",
    ],
    "UNAUTHENTICATED_USER": None,
}

# ── JWT ────────────────────────────────────────────────
JWT_SECRET = os.getenv("JWT_SECRET", "fallback-jwt-secret")

# ── Gemini AI ──────────────────────────────────────────
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# ── Static files & SPA ────────────────────────────────
# The pre-built Vite frontend lives in  backend/public/  (repo-level).
# We also copy / symlink it so Django's staticfiles can serve the assets.
SPA_ROOT = PROJECT_ROOT / "backend" / "public"

STATIC_URL = "/assets/"
STATICFILES_DIRS = [
    SPA_ROOT / "assets",        # Vite-hashed JS/CSS bundles
]
STATIC_ROOT = BASE_DIR / "staticfiles"

# ── Templates (not used, but required by some Django internals) ─
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": False,
        "OPTIONS": {"context_processors": []},
    },
]

# ── Misc ───────────────────────────────────────────────
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
APPEND_SLASH = False                                        # Express doesn't
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_TZ = True
