from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

class ApplicationCreate(BaseModel):
    applicant_name: str
    email: EmailStr
    phone: Optional[str] = None
    resume_url: str
    cover_letter: Optional[str] = None

class ApplicationUpdate(BaseModel):
    status: Optional[str] = None

class ApplicationOut(BaseModel):
    id: int
    job_id: int
    applicant_name: str
    email: str
    phone: Optional[str] = None
    resume_url: str
    cover_letter: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
