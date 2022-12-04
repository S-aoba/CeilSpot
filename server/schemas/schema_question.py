from pydantic import BaseModel, Field
from typing import List, Optional
from decouple import config


# 質問用: レスポンス
class ResQuestion(BaseModel):
    id: str
    title: str
    body: str
    post_username: str
    is_already_answered: bool = Field(default=False, title="回答されているかどうかの判定")
    answer_list: list[str] = Field(title="質問に対する回答の配列")
    tags: list[str]


# 質問用: データベース
class DbQuestion(BaseModel):
    title: str
    body: str
    post_username: str
    is_already_answered: bool = Field(default=False, title="回答されているかどうかの判定")
    answer_list: list[str] = Field(title="質問に対する回答の配列")
    tags: list[str]
