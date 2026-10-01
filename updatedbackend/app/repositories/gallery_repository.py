from typing import List
from sqlalchemy.orm import Session
from app.models.gallery import GalleryItem
from app.repositories.base import BaseRepository

class GalleryRepository(BaseRepository[GalleryItem]):
    def __init__(self):
        super().__init__(GalleryItem)

    def get_active(self, db: Session, skip: int = 0, limit: int = 100) -> List[GalleryItem]:
        return db.query(GalleryItem).filter(GalleryItem.is_active == True).offset(skip).limit(limit).all()

gallery_repository = GalleryRepository()
