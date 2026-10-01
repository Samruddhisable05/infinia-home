from typing import List
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.document import DocumentCreate, DocumentUpdate, DocumentOut
from app.services.document_service import document_service

router = APIRouter(prefix="/documents", tags=["Downloads & Documents"])

@router.get("", response_model=List[DocumentOut])
def get_documents(
    active_only: bool = Query(True),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return document_service.get_documents(db, active_only=active_only, skip=skip, limit=limit)

@router.post("", response_model=DocumentOut, status_code=status.HTTP_201_CREATED)
def create_document(
    doc_in: DocumentCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return document_service.create_document(db, doc_in)

@router.put("/{id}", response_model=DocumentOut)
def update_document(
    id: int,
    doc_in: DocumentUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return document_service.update_document(db, doc_id=id, doc_in=doc_in)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    document_service.delete_document(db, doc_id=id)
    return None
