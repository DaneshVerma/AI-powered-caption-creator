"""
Custom User model — mirrors the existing Mongoose schema:
  • username  (unique, required)
  • email     (unique but nullable — Mongoose sparse index)
  • password  (hashed with bcrypt)
"""

from django.db import models
import bcrypt


class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True, null=True, blank=True, default=None)
    password = models.CharField(max_length=128)

    class Meta:
        db_table = "users"

    # ── password helpers ──────────────────────────────
    def set_password(self, raw_password: str) -> None:
        """Hash *raw_password* with bcrypt and store it."""
        salt = bcrypt.gensalt(rounds=10)
        self.password = bcrypt.hashpw(
            raw_password.encode("utf-8"), salt
        ).decode("utf-8")

    def check_password(self, raw_password: str) -> bool:
        """Return True if *raw_password* matches the stored hash."""
        return bcrypt.checkpw(
            raw_password.encode("utf-8"),
            self.password.encode("utf-8"),
        )

    def to_dict(self) -> dict:
        """Serialise to JSON-safe dict (matches the Express response shape)."""
        return {
            "_id": str(self.pk),
            "username": self.username,
            "email": self.email or "",
            "password": self.password,      # Express returns the hash too
        }

    def __str__(self):
        return self.username
