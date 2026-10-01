from typing import List
from sqlalchemy.orm import Session
from app.models.application import JobApplication
from app.repositories.base import BaseRepository

class ApplicationRepository(BaseRepository[JobApplication]):
    def __init__(self):
        super().__init__(JobApplication)

    def get_by_job_id(self, db: Session, job_id: int, skip: int = 0, limit: int = 100) -> List[JobApplication]:
        return db.query(JobApplication).filter(JobApplication.job_id == job_id).offset(skip).limit(limit).all()

application_repository = ApplicationRepository()
