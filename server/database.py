from fastapi import HTTPException
from decouple import config
from bson import ObjectId
from typing import Union
import motor.motor_asyncio
from auth_utils import AuthJwtCsrf


MONGO_API_KEY = config("MONGO_API_KEY")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_API_KEY)
database = client.CeilSpot
collection_question = database.question
collection_answer = database.answer
collection_user = database.user

auth = AuthJwtCsrf()


def user_serializer(user) -> dict:
    return {"id": str(user["_id"]), "username": user["username"], "email": user["email"], "self_introduction": user["self_introduction"], "twitter": user["twitter"], "github": user["github"], "website": user["website"]}


def user_info_serializer(user) -> dict:
    return {"id": str(user["_id"]), "username": user["username"], "self_introduction": user["self_introduction"], "twitter": user["twitter"], "github": user["github"], "website": user["website"]}


def username_serializer(user) -> dict:
    return {"id": str(user["_id"]), "username": user["username"]}


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
        return username_serializer(new_user)
    return False


# userの削除


# Mongodbの_idをstring型にした上で、dataを辞書型(dict)に変換する
def question_serializer(question) -> dict:
    return {"id": str(question["_id"]), "title": question["title"], "body": question["body"], "post_username": question["post_username"], "is_already_answered": question["is_already_answered"], "answer_list": question["answer_list"], "tags": question["tags"]}


# userごとの質問の全件取得(100件まで)
async def db_get_user_questions(username: str) -> list:
    questions = []
    for question in await collection_question.find({"post_username": username}).to_list(length=100):
        questions.append(question_serializer(question))
    return questions


# questionの全件取得(100件まで)
async def db_get_questions() -> list:
    questions = []
    for question in await collection_question.find().to_list(length=100):
        questions.append(question_serializer(question))
    return questions


# questionの個別取得
async def db_get_single_question(id: str) -> Union[dict, bool]:
    question = await collection_question.find_one({"_id": ObjectId(id)})
    if question:
        return question_serializer(question)
    return False


# questionの作成
async def db_create_question(data: dict) -> Union[dict, bool]:
    question = await collection_question.insert_one(data)
    new_question = await collection_question.find_one({"_id": question.inserted_id})
    if new_question:
        return question_serializer(new_question)
    return False


# questionの更新
async def db_update_question(id: str, data: dict) -> Union[dict, bool]:
    # questionが存在しているか確認
    question = await collection_question.find_one({"_id": ObjectId(id)})
    if question:
        update_question = await collection_question.update_one({"_id": ObjectId(id)}, {"$set": data})
        if update_question.modified_count > 0:
            new_question = await collection_question.find_one({"_id": ObjectId(id)})
            return question_serializer(new_question)
    return False


# questionの削除
async def db_delete_question(id: str) -> bool:
    question = await collection_question.find_one({"_id": ObjectId(id)})
    if question:
        deleted_question = await collection_question.delete_one({"_id": ObjectId(id)})
        if deleted_question.deleted_count > 0:
            rm_question_id_from_answer = await collection_answer.delete_many({"question_id": id})
            return True
    return False


# Mongodbの_idをstring型にした上で、dataを辞書型(dict)に変換する
def answer_serializer(answer) -> dict:
    return {"id": str(answer["_id"]), "body": answer["body"], "question_id": answer["question_id"], "respondent_username": answer["respondent_username"]}


# userごとのanswerの全件取得(100件まで)
async def db_get_user_answers(username: str) -> list:
    answers = []
    for answer in await collection_answer.find({"respondent_username": username}).to_list(length=100):
        answers.append(answer_serializer(answer))
    return answers


# answerの取得(該当の質問に紐づいた回答のみを返す)
async def db_get_single_answer(answer_id: str) -> Union[dict, bool]:
    answer = await collection_answer.find_one({"_id": ObjectId(answer_id)})
    if answer:
        return answer_serializer(answer)
    return False


# answerの作成
async def db_create_answer(data: dict) -> Union[dict, bool]:
    # answerをデータベースへ格納
    answer = await collection_answer.insert_one(data)
    new_answer = await collection_answer.find_one({"_id": answer.inserted_id})
    # answerが正常にデータベースに格納されているかの確認
    if new_answer:
        # answerのidをquestionのanswer_listに格納する
        target_question_to_be_stored = await collection_question.find_one({"_id": ObjectId(new_answer["question_id"])})
        if target_question_to_be_stored:
            update_question = await collection_question.update_one({"_id": target_question_to_be_stored["_id"]}, {"$set": {"answer_list": [*target_question_to_be_stored["answer_list"], str(new_answer["_id"])]}})
            if update_question.modified_count > 0:
                return answer_serializer(new_answer)
    return False


# answerの更新
async def db_update_answer(answer_id: str, data: dict) -> Union[dict, bool]:
    # answerが存在しているか確認
    answer = await collection_answer.find_one({"_id": ObjectId(answer_id)})
    if answer:
        update_answer = await collection_answer.update_one({"_id": ObjectId(answer_id)}, {"$set": data})
        if update_answer.modified_count > 0:
            new_answer = await collection_answer.find_one({"_id": ObjectId(answer_id)})
            return answer_serializer(new_answer)
    return False


# answerの削除
async def db_delete_answer(target_answer_id: str) -> bool:
    answer = await collection_answer.find_one({"_id": ObjectId(target_answer_id)})
    # 該当のanswerを正常に削除
    if answer:
        deleted_answer = await collection_answer.delete_one({"_id": ObjectId(target_answer_id)})
        if deleted_answer.deleted_count > 0:
            # questionのanswer_listからも削除
            # answerのquestion_idを使って対象のquestionを取得
            question = await collection_question.find_one({"_id": ObjectId(answer["question_id"])})
            # 紐づいているquestionのanswer_listから該当のanswerを削除
            prev_answer_list = question["answer_list"]
            new_answer_list = []
            for answer_id in prev_answer_list:
                if answer_id != target_answer_id:
                    new_answer_list.append(answer_id)
            update_answer_list_in_target_question = await collection_question.update_one({"_id": question["_id"]}, {"$set": {"answer_list": new_answer_list}})
            if update_answer_list_in_target_question.modified_count > 0:
                return True
    return False
