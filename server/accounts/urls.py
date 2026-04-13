from django.urls import path
from . import views

urlpatterns = [
    path("register", views.register_view, name="auth-register"),
    path("login", views.login_view, name="auth-login"),
    path("google", views.google_login_view, name="auth-google"),
]
