from typing import List
from sqlalchemy.orm import Session
from app.models.contact import ContactEnquiry
from app.repositories.base import BaseRepository

class ContactRepository(BaseRepository[ContactEnquiry]):
    def __init__(self):
        super().__init__(ContactEnquiry)

    def get_by_status(self, db: Session, status: str, skip: int = 0, limit: int = 100) -> List[ContactEnquiry]:
        return db.query(ContactEnquiry).filter(ContactEnquiry.status == status).offset(skip).limit(limit).all()

contact_repository = ContactRepository()
