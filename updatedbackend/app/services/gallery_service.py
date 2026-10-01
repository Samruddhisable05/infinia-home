from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.gallery_repository import gallery_repository
from app.schemas.gallery import GalleryCreate, GalleryUpdate
from app.models.gallery import GalleryItem

class GalleryService:
    def get_items(self, db: Session, active_only: bool = True, skip: int = 0, limit: int = 100) -> List[GalleryItem]:
        if active_only:
            return gallery_repository.get_active(db, skip=skip, limit=limit)
        return gallery_repository.get_all(db, skip=skip, limit=limit)

    def get_item(self, db: Session, item_id: int) -> GalleryItem:
        item = gallery_repository.get_by_id(db, item_id)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery item not found")
        return item

    def create_item(self, db: Session, item_in: GalleryCreate) -> GalleryItem:
        return gallery_repository.create(db, item_in.model_dump())

    def update_item(self, db: Session, item_id: int, item_in: GalleryUpdate) -> GalleryItem:
        item = self.get_item(db, item_id)
        return gallery_repository.update(db, item, item_in.model_dump(exclude_unset=True))

    def delete_item(self, db: Session, item_id: int) -> bool:
        item = self.get_item(db, item_id)
        return gallery_repository.delete(db, item.id)

gallery_service = GalleryService()
