from pathlib import Path

from django.conf import settings
from django.http import HttpResponse, Http404


def spa_fallback(request):
    """Return the pre-built Vite index.html for any non-API route (SPA)."""
    index_path: Path = settings.SPA_ROOT / "index.html"
    if not index_path.is_file():
        raise Http404("Frontend build not found. Run the Vite build first.")
    return HttpResponse(index_path.read_text(), content_type="text/html")
