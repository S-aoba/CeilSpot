from typing import List
from starlette.status import HTTP_201_CREATED
from fastapi import APIRouter, HTTPException, Response, Request, Depends
from fastapi.encoders import jsonable_encoder
from fastapi_csrf_protect import CsrfProtect
from database.database_question import db_create_question, db_get_questions, db_get_single_question, db_update_question, db_delete_question, db_get_user_questions
from schemas.schema_question import ResQuestion, DbQuestion
from auth_utils import AuthJwtCsrf


router = APIRouter()
auth = AuthJwtCsrf()


@router.post("/api/question", response_model=ResQuestion)
async def create_question(request: Request, response: Response, data: DbQuestion, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    question = jsonable_encoder(data)
    res = await db_create_question(question)
    response.status_code = HTTP_201_CREATED
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="Create question failed")


@router.get("/api/{username}/question", response_model=List[ResQuestion])
async def get_user_questions(request: Request, response: Response, username: str):
    new_token, _ = auth.verify_update_jwt(request)
    res = await db_get_user_questions(username)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail=f"post_username: {username} doesn't exist")


@router.get("/api/question", response_model=List[ResQuestion])
async def get_questions(request: Request):
    res = await db_get_questions()
    return res


@router.get("/api/question/{id}", response_model=ResQuestion)
async def get_single_question(request: Request, response: Response, id: str):
    res = await db_get_single_question(id)
    if res:
        return res
    raise HTTPException(status_code=404, detail=f"question of ID: {id} doesn't exist")


@router.put("/api/question/{id}", response_model=ResQuestion)
async def update_question(request: Request, response: Response, id: str, data: DbQuestion, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    question = jsonable_encoder(data)
    res = await db_update_question(id, question)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="Update question failed")


@router.delete("/api/question/{id}", response_model=dict)
async def delete_question(request: Request, response: Response, id: str, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    res = await db_delete_question(id)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="delete question failed")
