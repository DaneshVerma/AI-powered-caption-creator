from django.urls import path
from . import views

urlpatterns = [
    path("", views.caption_view, name="caption"),
]
