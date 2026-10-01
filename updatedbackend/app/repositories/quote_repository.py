from typing import List
from sqlalchemy.orm import Session
from app.models.quote import QuoteRequest
from app.repositories.base import BaseRepository

class QuoteRepository(BaseRepository[QuoteRequest]):
    def __init__(self):
        super().__init__(QuoteRequest)

    def get_by_status(self, db: Session, status: str, skip: int = 0, limit: int = 100) -> List[QuoteRequest]:
        return db.query(QuoteRequest).filter(QuoteRequest.status == status).offset(skip).limit(limit).all()

quote_repository = QuoteRepository()
