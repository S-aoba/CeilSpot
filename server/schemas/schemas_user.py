from pydantic import BaseModel, Field
from typing import List, Optional
from decouple import config

CSRF_KEY = config("CSRF_KEY")


# ユーザーIDとユーザーネームのデータ型
class UserIdAndUsername(BaseModel):
    id: str
    username: str


# ユーザーネーム変更用のデータ型
class RenameUsername(BaseModel):
    username: str


# ユーザー情報: レスポンス
class ResUser(BaseModel):
    id: Optional[str] = None
    username: str
    self_introduction: Optional[str] = None
    twitter: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None


# ユーザ情報更新用: レスポンス
class ResUpdateUser(BaseModel):
    id: str
    username: str
    self_introduction: Optional[str] = None
    twitter: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None


# ユーザ情報用: データベース
class DbUser(BaseModel):
    username: str
    email: str
    password: str
    self_introduction: Optional[str] = None
    twitter: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None


# ユーザ情報更新用: データベース
class DbUpdateUser(BaseModel):
    username: str
    self_introduction: Optional[str] = None
    twitter: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None
