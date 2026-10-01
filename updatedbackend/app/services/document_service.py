from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.document_repository import document_repository
from app.schemas.document import DocumentCreate, DocumentUpdate
from app.models.document import DocumentResource

class DocumentService:
    def get_documents(self, db: Session, active_only: bool = True, skip: int = 0, limit: int = 100) -> List[DocumentResource]:
        if active_only:
            return document_repository.get_active(db, skip=skip, limit=limit)
        return document_repository.get_all(db, skip=skip, limit=limit)

    def get_document(self, db: Session, doc_id: int) -> DocumentResource:
        doc = document_repository.get_by_id(db, doc_id)
        if not doc:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document resource not found")
        return doc

    def create_document(self, db: Session, doc_in: DocumentCreate) -> DocumentResource:
        return document_repository.create(db, doc_in.model_dump())

    def update_document(self, db: Session, doc_id: int, doc_in: DocumentUpdate) -> DocumentResource:
        doc = self.get_document(db, doc_id)
        return document_repository.update(db, doc, doc_in.model_dump(exclude_unset=True))

    def delete_document(self, db: Session, doc_id: int) -> bool:
        doc = self.get_document(db, doc_id)
        return document_repository.delete(db, doc.id)

document_service = DocumentService()
