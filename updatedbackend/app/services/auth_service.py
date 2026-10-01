from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.core.security import verify_password, create_access_token
from app.repositories.user_repository import user_repository
from app.schemas.user import UserLogin, Token

class AuthService:
    def authenticate_user(self, db: Session, login_data: UserLogin) -> Token:
        user = user_repository.get_by_email(db, email=login_data.username)
        if not user or not verify_password(login_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User account is inactive"
            )
        access_token = create_access_token(data={"sub": user.email})
        return Token(access_token=access_token, token_type="bearer", user=user)

auth_service = AuthService()
