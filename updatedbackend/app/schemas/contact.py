from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: Optional[str] = None
    message: str

class ContactUpdate(BaseModel):
    status: Optional[str] = None  # new, read, in_progress, resolved

class ContactOut(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: Optional[str] = None
    message: str
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
