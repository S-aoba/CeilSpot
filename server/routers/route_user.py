from fastapi import APIRouter, HTTPException, Response, Request, Depends
from fastapi.encoders import jsonable_encoder
from fastapi_csrf_protect import CsrfProtect
from schemas import UpdateUser, UserBody, SuccessMsg
from database import db_userInfo_update, db_get_userInfo
from auth_utils import AuthJwtCsrf


router = APIRouter()
auth = AuthJwtCsrf()


@router.put("/api/user/{username}", response_model=SuccessMsg)
async def userInfo_update(request: Request, response: Response, username: str, data: UpdateUser, csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
    user = jsonable_encoder(data)
    res = await db_userInfo_update(username, user)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return {"message": "Successfully Updated"}
    raise HTTPException(status_code=404, detail="Update user failed")


@router.get("/api/user/{username}", response_model=UpdateUser)
async def get_UserInfo(request: Request, response: Response, username: str, csrf_protect: CsrfProtect = Depends()):
    new_token, _ = auth.verify_update_jwt(request)
    res = await db_get_userInfo(username)
    response.set_cookie(key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if res:
        return res
    raise HTTPException(status_code=404, detail="userInfo is failed")
