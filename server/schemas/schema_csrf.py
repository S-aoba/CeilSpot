from pydantic import BaseModel, Field
from typing import List, Optional
from decouple import config

CSRF_KEY = config("CSRF_KEY")


class SuccessMsg(BaseModel):
    message: str


class CsrfSettings(BaseModel):
    secret_key: str = CSRF_KEY


class Csrf(BaseModel):
    csrf_token: str
