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
async def db_delete_question(id: str) -> Union[str, bool]:
    question = await collection_question.find_one({"_id": ObjectId(id)})
    if question:
        deleted_question = await collection_question.delete_one({"_id": ObjectId(id)})
        if deleted_question.deleted_count > 0:
            rm_question_id_from_answer = await collection_answer.delete_many({"question_id": id})
            target_user_id = await collection_user.find_one({"username": question["post_username"]})
            return str(target_user_id["_id"])
    return False
