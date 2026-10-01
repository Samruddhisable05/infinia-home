from typing import List
from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.blog_repository import blog_repository
from app.schemas.blog import BlogCreate, BlogUpdate
from app.models.blog import BlogPost
from app.utils.slugify import slugify

class BlogService:
    def get_blogs(self, db: Session, published_only: bool = True, skip: int = 0, limit: int = 100) -> List[BlogPost]:
        if published_only:
            return blog_repository.get_published(db, skip=skip, limit=limit)
        return blog_repository.get_all(db, skip=skip, limit=limit)

    def get_blog(self, db: Session, identifier: str) -> BlogPost:
        if identifier.isdigit():
            blog = blog_repository.get_by_id(db, int(identifier))
        else:
            blog = blog_repository.get_by_slug(db, identifier)
        if not blog:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found")
        return blog

    def create_blog(self, db: Session, blog_in: BlogCreate) -> BlogPost:
        slug = blog_in.slug or slugify(blog_in.title)
        existing = blog_repository.get_by_slug(db, slug)
        if existing:
            slug = f"{slug}-{int(db.query(BlogPost).count()) + 1}"
        
        data = blog_in.model_dump()
        data["slug"] = slug
        if data.get("is_published") and not data.get("published_at"):
            data["published_at"] = datetime.now(timezone.utc)
        return blog_repository.create(db, data)

    def update_blog(self, db: Session, blog_id: int, blog_in: BlogUpdate) -> BlogPost:
        blog = self.get_blog(db, str(blog_id))
        data = blog_in.model_dump(exclude_unset=True)
        if "title" in data and "slug" not in data:
            data["slug"] = slugify(data["title"])
        if data.get("is_published") and not blog.published_at:
            data["published_at"] = datetime.now(timezone.utc)
        return blog_repository.update(db, blog, data)

    def delete_blog(self, db: Session, blog_id: int) -> bool:
        blog = self.get_blog(db, str(blog_id))
        return blog_repository.delete(db, blog.id)

blog_service = BlogService()
