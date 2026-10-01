from typing import List
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.gallery import GalleryCreate, GalleryUpdate, GalleryOut
from app.services.gallery_service import gallery_service

router = APIRouter(prefix="/gallery", tags=["Gallery"])

@router.get("", response_model=List[GalleryOut])
def get_gallery(
    active_only: bool = Query(True),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return gallery_service.get_items(db, active_only=active_only, skip=skip, limit=limit)

@router.get("/{id}", response_model=GalleryOut)
def get_gallery_item(
    id: int,
    db: Session = Depends(get_db)
):
    return gallery_service.get_item(db, item_id=id)

@router.post("", response_model=GalleryOut, status_code=status.HTTP_201_CREATED)
def create_gallery_item(
    item_in: GalleryCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return gallery_service.create_item(db, item_in)

@router.put("/{id}", response_model=GalleryOut)
def update_gallery_item(
    id: int,
    item_in: GalleryUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return gallery_service.update_item(db, item_id=id, item_in=item_in)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gallery_item(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    gallery_service.delete_item(db, item_id=id)
    return None
