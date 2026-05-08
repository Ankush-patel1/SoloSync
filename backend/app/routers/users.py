from fastapi import APIRouter, Depends, HTTPException, status
from .. import schemas
from ..auth import hash_password, verify_password, create_access_token, get_current_user
from ..database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=schemas.UserOut, status_code=201)
def register(body: schemas.RegisterRequest, conn = Depends(get_db)):
    with conn.cursor() as cur:
        cur.execute("SELECT id FROM users WHERE email = %s", (body.email,))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")
        
        try:
            cur.execute(
                "INSERT INTO users (name, email, hashed_password, role) VALUES (%s, %s, %s, %s) RETURNING *",
                (body.name, body.email, hash_password(body.password), body.role)
            )
            user = cur.fetchone()
            conn.commit()
            return dict(user)
        except Exception as e:
            conn.rollback()
            raise e

@router.post("/login", response_model=schemas.TokenResponse)
def login(body: schemas.LoginRequest, conn = Depends(get_db)):
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM users WHERE email = %s", (body.email,))
        user = cur.fetchone()
        
    if not user or not verify_password(body.password, user['hashed_password']):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": str(user['id'])})
    return {"access_token": token, "token_type": "bearer", "user": dict(user)}

@router.get("/me", response_model=schemas.UserOut)
def me(current_user: dict = Depends(get_current_user)):
    return current_user

class PasswordChange(schemas.BaseModel):
    current_password: str
    new_password: str

@router.put("/password")
def change_password(body: PasswordChange, current_user: dict = Depends(get_current_user), conn = Depends(get_db)):
    if not verify_password(body.current_password, current_user['hashed_password']):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    with conn.cursor() as cur:
        cur.execute("UPDATE users SET hashed_password = %s WHERE id = %s", (hash_password(body.new_password), current_user['id']))
    conn.commit()
    return {"message": "Password updated successfully"}

@router.put("/verify", response_model=schemas.UserOut)
def verify_user(current_user: dict = Depends(get_current_user), conn = Depends(get_db)):
    with conn.cursor() as cur:
        cur.execute("UPDATE users SET is_verified = TRUE WHERE id = %s RETURNING *", (current_user['id'],))
        user = cur.fetchone()
    conn.commit()
    return dict(user)
