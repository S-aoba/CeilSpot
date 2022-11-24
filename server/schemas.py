from pydantic import BaseModel, Field
from typing import List, Optional
from decouple import config

CSRF_KEY = config("CSRF_KEY")


class CsrfSettings(BaseModel):
    secret_key: str = CSRF_KEY


class SuccessMsg(BaseModel):
    message: str


# クライアントへ渡すレスポンスデータ型
class Question(BaseModel):
    id: str
    title: str
    body: str
    post_username: str
    is_already_answered: bool = Field(default=False, title="回答されているかどうかの判定")
    answer_list: list[str] = Field(title="質問に対する回答の配列")
    tags: list[str]


# データベースへ格納する際のデータ型
class QuestionBody(BaseModel):
    title: str
    body: str
    post_username: str
    is_already_answered: bool = Field(default=False, title="回答されているかどうかの判定")
    answer_list: list[str] = Field(title="質問に対する回答の配列")
    tags: list[str]


# クライアントへ渡すレスポンスデータ型
class Answer(BaseModel):
    id: str
    body: str
    question_id: str = Field(title="紐づいている質問のID")
    respondent_username: str


# データベースへ格納する際のデータ型
class AnswerBody(BaseModel):
    body: str
    question_id: str = Field(title="紐づいている質問のID")
    respondent_username: str


# クライアントへ渡すレスポンスデータ型
class UserInfo(BaseModel):
    id: Optional[str] = None
    username: str
    self_introduction: Optional[str] = None
    twitter: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None


# データベースへ格納する際のデータ型
class UserBody(BaseModel):
    username: str
    email: str
    password: str
    self_introduction: Optional[str] = None
    twitter: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None


# 更新用のUserのデータ型
class UpdateUser(BaseModel):
    username: str
    self_introduction: Optional[str] = None
    twitter: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None


# ユーザーネームのデータ型
class Username(BaseModel):
    username: str


# ユーザーネーム変更用のデータ型
class ChangeUsername(BaseModel):
    username: str


class Csrf(BaseModel):
    csrf_token: str
