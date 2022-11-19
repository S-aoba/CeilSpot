from fastapi import APIRouter, HTTPException, Response, Request, Depends
from fastapi.encoders import jsonable_encoder
from auth_utils import AuthJwtCsrf
from fastapi_csrf_protect import CsrfProtect
from starlette.status import HTTP_201_CREATED
from schemas import Answer, AnswerBody, SuccessMsg
from database import db_create_answer, db_update_answer, db_delete_answer, db_get_single_answer, db_get_user_answers
from typing import List


router = APIRouter()
auth = AuthJwtCsrf()

# 回答の作成
@router.post("/api/answer", response_model=Answer)
async def create_answer(request: Request, response: Response, data: AnswerBody, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    answer = jsonable_encoder(data)
    res = await db_create_answer(answer)
    response.status_code = HTTP_201_CREATED
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="Create answer failed")


# userごとの回答の全件取得
@router.get("/api/{username}/answer", response_model=List[Answer])
async def get_user_answers(request: Request, response: Response, username: str):
    new_token, _ = auth.verify_update_jwt(request)
    res = await db_get_user_answers(username)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res or len(res) == 0:
        return res
    raise HTTPException(status_code=404, detail=f"respondent_username: {username} doesn't exist")


# 個別の質問に紐づけられた回答の取得
@router.get("/api/answer/{answer_id}", response_model=Answer)
async def get_single_answer(request: Request, response: Response, answer_id: str):
    new_token, _ = auth.verify_update_jwt(request)
    res = await db_get_single_answer(answer_id)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail=f"answer of ID: {id} doesn't exist")


# 回答の更新
@router.put("/api/answer/{answer_id}", response_model=Answer)
async def update_answer(request: Request, response: Response, answer_id: str, data: AnswerBody, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    answer = jsonable_encoder(data)
    res = await db_update_answer(answer_id, answer)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="Update answer failed")


# 回答の削除
@router.delete("/api/answer/{question_id}", response_model=SuccessMsg)
async def delete_answer(request: Request, response: Response, question_id: str, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    res = await db_delete_answer(question_id)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return {"message": "Successfully deleted"}
    raise HTTPException(status_code=404, detail="delete answer failed")
