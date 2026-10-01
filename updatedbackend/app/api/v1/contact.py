from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.contact import ContactCreate, ContactUpdate, ContactOut
from app.services.contact_service import contact_service

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("", response_model=ContactOut, status_code=status.HTTP_201_CREATED)
def submit_contact_enquiry(
    enquiry_in: ContactCreate,
    db: Session = Depends(get_db)
):
    return contact_service.create_enquiry(db, enquiry_in)

@router.get("", response_model=List[ContactOut])
def get_contact_enquiries(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return contact_service.get_enquiries(db, skip=skip, limit=limit)

@router.get("/{id}", response_model=ContactOut)
def get_contact_enquiry(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return contact_service.get_enquiry(db, enquiry_id=id)

@router.put("/{id}", response_model=ContactOut)
def update_contact_enquiry(
    id: int,
    enquiry_in: ContactUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return contact_service.update_enquiry(db, enquiry_id=id, enquiry_in=enquiry_in)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact_enquiry(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    contact_service.delete_enquiry(db, enquiry_id=id)
    return None
