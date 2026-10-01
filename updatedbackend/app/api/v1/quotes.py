from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.quote import QuoteCreate, QuoteUpdate, QuoteOut
from app.services.quote_service import quote_service

router = APIRouter(prefix="/quotes", tags=["Get a Quote"])

@router.post("", response_model=QuoteOut, status_code=status.HTTP_201_CREATED)
def submit_quote_request(
    quote_in: QuoteCreate,
    db: Session = Depends(get_db)
):
    return quote_service.create_quote_request(db, quote_in)

@router.get("", response_model=List[QuoteOut])
def get_quote_requests(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return quote_service.get_quote_requests(db, skip=skip, limit=limit)

@router.get("/{id}", response_model=QuoteOut)
def get_quote_request(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return quote_service.get_quote_request(db, quote_id=id)

@router.put("/{id}", response_model=QuoteOut)
def update_quote_request(
    id: int,
    quote_in: QuoteUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return quote_service.update_quote_request(db, quote_id=id, quote_in=quote_in)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_quote_request(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    quote_service.delete_quote_request(db, quote_id=id)
    return None
