from pydantic import BaseModel, Field
from typing import List, Optional
from decouple import config


# 回答用 レスポンス
class ResAnswer(BaseModel):
    id: str
    body: str
    question_id: str = Field(title="紐づいている質問のID")
    respondent_username: str


# 回答用: データベース
class DbAnswer(BaseModel):
    body: str
    question_id: str = Field(title="紐づいている質問のID")
    respondent_username: str
