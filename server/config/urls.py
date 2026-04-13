from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve as static_serve

from config.views import spa_fallback

urlpatterns = [
    # ── API routes (must come before the SPA catch-all) ──
    path("auth/", include("accounts.urls")),
    path("api", include("captions.urls")),   # POST /api  (no trailing slash)

    # ── SPA fallback: serve index.html for every other route ──
    re_path(r"^(?!assets/).*$", spa_fallback, name="spa-fallback"),
]
