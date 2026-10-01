from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.core.security import get_password_hash

def init_db(db: Session) -> None:
    # Ensure all tables exist
    Base.metadata.create_all(bind=engine)
    
    # Import User model to check/seed default admin user
    from app.models.user import User
    admin = db.query(User).filter(User.email == "admin@infinia.com").first()
    if not admin:
        admin = User(
            email="admin@infinia.com",
            hashed_password=get_password_hash("admin123"),
            full_name="System Administrator",
            is_active=True,
            is_admin=True
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        print("Default admin user created: admin@infinia.com / admin123")
