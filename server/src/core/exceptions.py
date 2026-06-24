class AppException(Exception):
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class GeminiServiceError(AppException):

    def __init__(self, message: str = "Gemini Service Error", status_code: int = 502):
        super().__init__(message, status_code)


class ValidationError(AppException):

    def __init__(self, message: str = "Validation Error", status_code: int = 422):
        super().__init__(message, status_code)


class NotFoundError(AppException):

    def __init__(self, message: str = "Resource Not Found", status_code: int = 404):
        super().__init__(message, status_code)
