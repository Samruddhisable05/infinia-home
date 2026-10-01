from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.blog import BlogPost
from app.repositories.base import BaseRepository

class BlogRepository(BaseRepository[BlogPost]):
    def __init__(self):
        super().__init__(BlogPost)

    def get_by_slug(self, db: Session, slug: str) -> Optional[BlogPost]:
        return db.query(BlogPost).filter(BlogPost.slug == slug).first()

    def get_published(self, db: Session, skip: int = 0, limit: int = 100) -> List[BlogPost]:
        return db.query(BlogPost).filter(BlogPost.is_published == True).offset(skip).limit(limit).all()

blog_repository = BlogRepository()
