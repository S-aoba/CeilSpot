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


# 質問用: レスポンス
class ResQuestion(BaseModel):
    id: str
    title: str
    body: str
    post_username: str
    is_already_answered: bool = Field(default=False, title="回答されているかどうかの判定")
    answer_list: list[str] = Field(title="質問に対する回答の配列")
    tags: list[str]


# 回答用 レスポンス
class ResAnswer(BaseModel):
    id: str
    body: str
    question_id: str = Field(title="紐づいている質問のID")
    respondent_username: str


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


# 質問用: データベース
class DbQuestion(BaseModel):
    title: str
    body: str
    post_username: str
    is_already_answered: bool = Field(default=False, title="回答されているかどうかの判定")
    answer_list: list[str] = Field(title="質問に対する回答の配列")
    tags: list[str]


# 回答用: データベース
class DbAnswer(BaseModel):
    body: str
    question_id: str = Field(title="紐づいている質問のID")
    respondent_username: str
