from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

class QuoteCreate(BaseModel):
    name: str
    company: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    product_id: Optional[int] = None
    quantity: Optional[str] = None
    location: Optional[str] = None
    message: Optional[str] = None

class QuoteUpdate(BaseModel):
    status: Optional[str] = None  # pending, reviewed, quoted, rejected, closed

class QuoteOut(BaseModel):
    id: int
    name: str
    company: Optional[str] = None
    email: str
    phone: Optional[str] = None
    product_id: Optional[int] = None
    quantity: Optional[str] = None
    location: Optional[str] = None
    message: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
