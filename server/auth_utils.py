import jwt
from fastapi import HTTPException
from passlib.context import CryptContext
from datetime import datetime, timedelta
from decouple import config

JWT_KEY = config("JWT_KEY")


class AuthJwtCsrf:
    pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
    secret_key = JWT_KEY
    # パスワードのハッシュ関連のメソッド
    # ユーザーがタイピングしたパスワードをハッシュ化
    def generate_hashed_pw(self, password) -> str:
        return self.pwd_ctx.hash(password)

    # ユーザーがタイピングしたパスワードと既にデータベースにあるハッシュ化されたパスワードが一致しているか確認
    def verify_pw(self, plain_pw, hashed_pw) -> bool:
        return self.pwd_ctx.verify(plain_pw, hashed_pw)

    # JWT関連のメソッド
    # JWTトークンを生成する
    def encode_jwt(self, id, username) -> str:
        payload = {"exp": datetime.utcnow() + timedelta(days=14, minutes=0), "iat": datetime.utcnow(), "sub": {"user_id": id, "user_name": username}}
        return jwt.encode(payload, self.secret_key, algorithm="HS256")

    # JWTトークンを受け取って検証する
    def decode_jwt(self, token) -> str:
        # 復号化してpayloadを返す
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=["HS256"])
            return payload["sub"]
        # JWTTokenが失効している場合
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="The JWT has expired")
        # JWTTokenが空や不適合の場合
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail="JWT is not valid")

    # JWTの検証
    def verify_jwt(self, request) -> dict:
        token = request.cookies.get("access_token")
        if not token:
            raise HTTPException(status_code=401, detail="No JWT exist: may not set yet or deleted")
        _, _, value = token.partition(" ")
        subject = self.decode_jwt(value)
        return subject

    # JWTの検証と更新
    def verify_update_jwt(self, request) -> tuple[str, dict]:
        # usernameが返ってくる
        subject = self.verify_jwt(request)
        new_token = self.encode_jwt(subject["user_id"], subject["user_name"])
        return new_token, subject

    # CSRFトークンの検証とJWTの更新
    def verify_csrf_update_jwt(self, request, csrf_protect, headers) -> str:
        csrf_token = csrf_protect.get_csrf_from_headers(headers)
        # CSRFトークンが有効かどうかの検証
        csrf_protect.validate_csrf(csrf_token)
        # JWTの検証
        subject = self.verify_jwt(request)
        new_token = self.encode_jwt(subject["user_id"], subject["user_name"])
        return new_token

    def is_authenticated(self, request) -> bool:
        token = request.cookies.get("access_token")
        if not token:
            return False
        return True
