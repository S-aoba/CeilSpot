from typing import List
from starlette.status import HTTP_201_CREATED
from fastapi import APIRouter, HTTPException, Response, Request, Depends
from fastapi.encoders import jsonable_encoder
from fastapi_csrf_protect import CsrfProtect
from schemas.schema_question import ResQuestion
from schemas.schema_answer import DbAnswer, ResAnswer
from database.database_answer import db_create_answer, db_update_answer, db_delete_answer, db_get_single_answer, db_get_user_answers
from auth_utils import AuthJwtCsrf


router = APIRouter()
auth = AuthJwtCsrf()

# 回答の作成
@router.post("/api/answer", response_model=ResQuestion)
async def create_answer(request: Request, response: Response, data: DbAnswer, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    answer = jsonable_encoder(data)
    res = await db_create_answer(answer)
    response.status_code = HTTP_201_CREATED
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="Create answer failed")


# 回答した質問の全件取得(100件まで)
@router.get("/api/{username}/answer", response_model=List[ResAnswer])
async def get_user_answers(request: Request, response: Response, username: str):
    new_token, _ = auth.verify_update_jwt(request)
    res = await db_get_user_answers(username)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail=f"respondent_username: {username} doesn't exist")


# 個別の質問に紐づけられた回答の取得
@router.get("/api/answer/{answer_id}", response_model=ResAnswer)
async def get_single_answer(request: Request, response: Response, answer_id: str):
    res = await db_get_single_answer(answer_id)
    if res:
        return res
    raise HTTPException(status_code=404, detail=f"answer of ID: {id} doesn't exist")


# 回答の更新
@router.put("/api/answer/{answer_id}", response_model=ResAnswer)
async def update_answer(request: Request, response: Response, answer_id: str, data: DbAnswer, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    answer = jsonable_encoder(data)
    res = await db_update_answer(answer_id, answer)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="Update answer failed")


# 回答の削除
@router.delete("/api/answer/{question_id}", response_model=str)
async def delete_answer(request: Request, response: Response, question_id: str, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    res = await db_delete_answer(question_id)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="delete answer failed")
