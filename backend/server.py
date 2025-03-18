from random import randint
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import jwt
import json
from fastapi.responses import JSONResponse


app = FastAPI()

origins = [
    "http://frontend:5173", # nginx ip
]

JWT_SECRET_KEY = "secret_key" # Should be saved as env var


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/getSomething")
def get_something(req: Request):
    auth_jwt = req.headers['authorization']

    try:
        decoded_jwt = jwt.decode(auth_jwt, JWT_SECRET_KEY, "HS256")  
        return "Hello world! " + str(randint(1,10))
    except jwt.ExpiredSignatureError:
        return JSONResponse(content={'error': 'Expired token'}, status_code=401)
    except jwt.InvalidTokenError:
        return JSONResponse(content={'error': 'Invalid token'}, status_code=401)
    except Exception as e:
        print(e)
