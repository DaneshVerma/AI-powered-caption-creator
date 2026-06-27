from src.schemas.auth import RegisterReq


class Authservice:
    def __init__(self) -> None:
        pass

    async def register_user(self, payload: RegisterReq) -> dict[str, str]:
        return {"sample": "for now"}


auth_service = Authservice()
