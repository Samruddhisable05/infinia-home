from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class GalleryBase(BaseModel):
    title: str
    description: Optional[str] = None
    image: str
    category: Optional[str] = None
    project_id: Optional[int] = None
    is_active: bool = True

class GalleryCreate(GalleryBase):
    pass

class GalleryUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    category: Optional[str] = None
    project_id: Optional[int] = None
    is_active: Optional[bool] = None

class GalleryOut(GalleryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
