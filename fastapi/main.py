from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from models import User, LoginModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

client = AsyncIOMotorClient('mongodb://localhost:27017')
db = client["mydatabase"]
collection = db["users"]

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint to create a new user
@app.post("/users/", response_model=User)
async def create_user(user: User):
    existing_user = await collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already in use !!")
    await collection.insert_one(user.dict())
    return user

# Endpoint to get all users
@app.get("/users/", response_model=list[User])
async def get_users():
    users = await collection.find().to_list(length=100)
    return users

# Endpoint for user login
@app.post("/login/")
async def login(user: LoginModel):
    existing_user = await collection.find_one({"email": user.email, "password": user.password})
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return {"message": "Login successful"}
