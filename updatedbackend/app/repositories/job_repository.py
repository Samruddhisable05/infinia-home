from typing import List
from sqlalchemy.orm import Session
from app.models.job import JobListing
from app.repositories.base import BaseRepository

class JobRepository(BaseRepository[JobListing]):
    def __init__(self):
        super().__init__(JobListing)

    def get_active(self, db: Session, skip: int = 0, limit: int = 100) -> List[JobListing]:
        return db.query(JobListing).filter(JobListing.is_active == True).offset(skip).limit(limit).all()

job_repository = JobRepository()
