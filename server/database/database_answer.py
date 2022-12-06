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


auth = AuthJwtCsrf()


# Mongodbの_idをstring型にした上で、dataを辞書型(dict)に変換する
def question_serializer(question) -> dict:
    return {"id": str(question["_id"]), "title": question["title"], "body": question["body"], "post_username": question["post_username"], "is_already_answered": question["is_already_answered"], "answer_list": question["answer_list"], "tags": question["tags"]}


# Mongodbの_idをstring型にした上で、dataを辞書型(dict)に変換する
def answer_serializer(answer) -> dict:
    return {"id": str(answer["_id"]), "body": answer["body"], "question_id": answer["question_id"], "respondent_username": answer["respondent_username"]}


# 回答した質問の全件取得(100件まで)
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
                # フロントエンド側で描画するため
                new_question = await collection_question.find_one({"_id": target_question_to_be_stored["_id"]})
                return question_serializer(new_question)
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
async def db_delete_answer(target_answer_id: str) -> Union[str, bool]:
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
                target_user_id = await collection_user.find_one({"username": answer["respondent_username"]})
                return str(target_user_id["_id"])
    return False
