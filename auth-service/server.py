from fastapi import FastAPI
from fastapi.responses import JSONResponse
import jwt
import datetime 
from utils.models import UserCredentials, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://frontend:5173", # NGINX ip
]

JWT_SECRET_KEY = "secret_key" # Should be saved as env var


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/authenticate")
def get_something(login_details: UserCredentials):
    for user in users:
        if (login_details.username == user['username'] and login_details.password == user['password']):
            payload = {
                "id": user['id'],
                "exp": (datetime.datetime.now() + datetime.timedelta(minutes=1)).timestamp().__floor__()
            }
            token = jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")  
            return JSONResponse(content={'token': token}, status_code=200)
        else:
            return JSONResponse(content={'error': 'Unauthorized - invalid credentials'}, status_code=401)

        
        