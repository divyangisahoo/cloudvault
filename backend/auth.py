from passlib.context import CryptContext
from jose import jwt

SECRET_KEY = "secret"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"])

def hash_password(password):
    password = password[:72]   # fix bcrypt limit
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain[:72], hashed)

def create_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])