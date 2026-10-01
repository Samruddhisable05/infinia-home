from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.quote_repository import quote_repository
from app.schemas.quote import QuoteCreate, QuoteUpdate
from app.models.quote import QuoteRequest

class QuoteService:
    def create_quote_request(self, db: Session, quote_in: QuoteCreate) -> QuoteRequest:
        return quote_repository.create(db, quote_in.model_dump())

    def get_quote_requests(self, db: Session, skip: int = 0, limit: int = 100) -> List[QuoteRequest]:
        return quote_repository.get_all(db, skip=skip, limit=limit)

    def get_quote_request(self, db: Session, quote_id: int) -> QuoteRequest:
        quote = quote_repository.get_by_id(db, quote_id)
        if not quote:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quote request not found")
        return quote

    def update_quote_request(self, db: Session, quote_id: int, quote_in: QuoteUpdate) -> QuoteRequest:
        quote = self.get_quote_request(db, quote_id)
        return quote_repository.update(db, quote, quote_in.model_dump(exclude_unset=True))

    def delete_quote_request(self, db: Session, quote_id: int) -> bool:
        quote = self.get_quote_request(db, quote_id)
        return quote_repository.delete(db, quote.id)

quote_service = QuoteService()
