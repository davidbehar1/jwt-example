from pydantic import BaseModel

class UserCredentials(BaseModel):
    username: str
    password: str

    
users = [
    {
        "id": 1,
        "username": "root",
        "password": "123"
    }
]