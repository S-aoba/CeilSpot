from fastapi import APIRouter, HTTPException, Response, Request, Depends
from fastapi.encoders import jsonable_encoder
from fastapi_csrf_protect import CsrfProtect
from schemas import DbUpdateUser, ResUpdateUser, ResUser, RenameUsername
from database import db_update_userInfo, db_get_userInfo, db_change_username
from auth_utils import AuthJwtCsrf


router = APIRouter()
auth = AuthJwtCsrf()


@router.put("/api/user/{id}", response_model=ResUpdateUser)
async def userInfo_update(request: Request, response: Response, id: str, data: DbUpdateUser, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    user = jsonable_encoder(data)
    res = await db_update_userInfo(id, user)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="Update user failed")


@router.put("/api/username/{id}", response_model=RenameUsername)
async def change_username(request: Request, response: Response, id: str, data: DbUpdateUser, csrf_protect: CsrfProtect = Depends()):
    auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    user = jsonable_encoder(data)
    res = await db_change_username(id, user)
    new_token = auth.encode_jwt(res["username"])
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="Update user failed")


@router.get("/api/user/{username}", response_model=ResUser)
async def get_UserInfo(request: Request, response: Response, username: str, csrf_protect: CsrfProtect = Depends()):
    new_token, _ = auth.verify_update_jwt(request)
    res = await db_get_userInfo(username)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="userInfo is failed")
