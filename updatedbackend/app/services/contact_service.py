from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.contact_repository import contact_repository
from app.schemas.contact import ContactCreate, ContactUpdate
from app.models.contact import ContactEnquiry

class ContactService:
    def create_enquiry(self, db: Session, enquiry_in: ContactCreate) -> ContactEnquiry:
        return contact_repository.create(db, enquiry_in.model_dump())

    def get_enquiries(self, db: Session, skip: int = 0, limit: int = 100) -> List[ContactEnquiry]:
        return contact_repository.get_all(db, skip=skip, limit=limit)

    def get_enquiry(self, db: Session, enquiry_id: int) -> ContactEnquiry:
        enquiry = contact_repository.get_by_id(db, enquiry_id)
        if not enquiry:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact enquiry not found")
        return enquiry

    def update_enquiry(self, db: Session, enquiry_id: int, enquiry_in: ContactUpdate) -> ContactEnquiry:
        enquiry = self.get_enquiry(db, enquiry_id)
        return contact_repository.update(db, enquiry, enquiry_in.model_dump(exclude_unset=True))

    def delete_enquiry(self, db: Session, enquiry_id: int) -> bool:
        enquiry = self.get_enquiry(db, enquiry_id)
        return contact_repository.delete(db, enquiry.id)

contact_service = ContactService()
