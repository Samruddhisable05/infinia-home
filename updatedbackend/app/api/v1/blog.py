from typing import List
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.blog import BlogCreate, BlogUpdate, BlogOut
from app.services.blog_service import blog_service

router = APIRouter(prefix="/blog", tags=["Blog"])

@router.get("", response_model=List[BlogOut])
def get_blogs(
    published_only: bool = Query(True),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return blog_service.get_blogs(db, published_only=published_only, skip=skip, limit=limit)

@router.get("/{slug_or_id}", response_model=BlogOut)
def get_blog(
    slug_or_id: str,
    db: Session = Depends(get_db)
):
    return blog_service.get_blog(db, identifier=slug_or_id)

@router.post("", response_model=BlogOut, status_code=status.HTTP_201_CREATED)
def create_blog(
    blog_in: BlogCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return blog_service.create_blog(db, blog_in)

@router.put("/{id}", response_model=BlogOut)
def update_blog(
    id: int,
    blog_in: BlogUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return blog_service.update_blog(db, blog_id=id, blog_in=blog_in)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_blog(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    blog_service.delete_blog(db, blog_id=id)
    return None
