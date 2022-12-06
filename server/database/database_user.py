from fastapi import HTTPException
from decouple import config
from bson import ObjectId
from typing import Union
import motor.motor_asyncio
from auth_utils import AuthJwtCsrf


MONGO_API_KEY = config("MONGO_API_KEY")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_API_KEY)
database = client.CeilSpot
collection_answer = database.answer
collection_question = database.question
collection_user = database.user

auth = AuthJwtCsrf()


def user_serializer(user) -> dict:
    return {"id": str(user["_id"]), "username": user["username"], "email": user["email"], "self_introduction": user["self_introduction"], "twitter": user["twitter"], "github": user["github"], "website": user["website"]}


def user_info_serializer(user) -> dict:
    return {"id": str(user["_id"]), "username": user["username"], "self_introduction": user["self_introduction"], "twitter": user["twitter"], "github": user["github"], "website": user["website"]}


# userの作成
async def db_signup(data: dict) -> dict:
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    self_introduction = data.get("self_introduction")
    twitter = data.get("twitter")
    github = data.get("github")
    website = data.get("website")
    overlap_user = await collection_user.find_one({"username": username})
    if overlap_user:
        raise HTTPException(status_code=400, detail="Username is already taken")
    if not password or len(password) < 6:
        raise HTTPException(status_code=400, detail="Password too short")
    user = await collection_user.insert_one({"username": username, "email": email, "password": auth.generate_hashed_pw(password), "self_introduction": self_introduction, "twitter": twitter, "github": github, "website": website})
    new_user = await collection_user.find_one({"_id": user.inserted_id})
    return user_serializer(new_user)


# userのログイン
async def db_login(data: dict) -> str:
    username = data.get("username")
    password = data.get("password")
    user = await collection_user.find_one({"username": username})
    # userが存在しない、もしくはハッシュ化されたパスワードと異なる場合
    if not user or not auth.verify_pw(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = auth.encode_jwt(str(user["_id"]), user["username"])
    return token


# userInfoの取得
async def db_get_userInfo(user_id: str) -> Union[dict, bool]:
    user = await collection_user.find_one({"_id": ObjectId(user_id)})
    if user:
        return user_info_serializer(user)
    return False


# userInfoの更新
async def db_update_userInfo(id: str, update_data: dict) -> Union[dict, bool]:
    user = await collection_user.find_one({"_id": ObjectId(id)})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username")
    updated_user = await collection_user.update_one({"_id": ObjectId(id)}, {"$set": {"username": update_data["username"], "self_introduction": update_data["self_introduction"], "twitter": update_data["twitter"], "github": update_data["github"], "website": update_data["website"]}})
    if updated_user.modified_count > 0:
        new_user = await collection_user.find_one({"_id": ObjectId(id)})
        return user_info_serializer(new_user)
    return False


# usernameの変更
async def db_change_username(id: str, update_data: dict) -> Union[dict, bool]:
    user = await collection_user.find_one({"_id": ObjectId(id)})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username")
    updated_user = await collection_user.update_one({"_id": ObjectId(id)}, {"$set": {"username": update_data["username"]}})
    updated_question_post_user = await collection_question.update_one({"post_username": user["username"]}, {"$set": {"post_username": update_data["username"]}})
    updated_question_post_user = await collection_question.update_many({"post_username": user["username"]}, {"$set": {"post_username": update_data["username"]}})
    updated_respondent_user = await collection_answer.update_many({"respondent_username": user["username"]}, {"$set": {"respondent_username": update_data["username"]}})
    if updated_user.modified_count > 0:
        new_user = await collection_user.find_one({"_id": ObjectId(id)})
        return user_info_serializer(new_user)
    return False


# userの削除
