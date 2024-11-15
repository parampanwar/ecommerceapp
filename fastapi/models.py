from pydantic import BaseModel, EmailStr 

class User(BaseModel):
    name:str
    email: EmailStr
    password: str
    address:str
    
class LoginModel(BaseModel):
    email : EmailStr
    password: str

