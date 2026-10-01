from typing import List
from sqlalchemy.orm import Session
from app.models.document import DocumentResource
from app.repositories.base import BaseRepository

class DocumentRepository(BaseRepository[DocumentResource]):
    def __init__(self):
        super().__init__(DocumentResource)

    def get_active(self, db: Session, skip: int = 0, limit: int = 100) -> List[DocumentResource]:
        return db.query(DocumentResource).filter(DocumentResource.is_active == True).offset(skip).limit(limit).all()

document_repository = DocumentRepository()
