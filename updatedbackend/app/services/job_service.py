from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.job_repository import job_repository
from app.repositories.application_repository import application_repository
from app.schemas.job import JobCreate, JobUpdate
from app.schemas.application import ApplicationCreate, ApplicationUpdate
from app.models.job import JobListing
from app.models.application import JobApplication

class JobService:
    def get_jobs(self, db: Session, active_only: bool = True, skip: int = 0, limit: int = 100) -> List[JobListing]:
        if active_only:
            return job_repository.get_active(db, skip=skip, limit=limit)
        return job_repository.get_all(db, skip=skip, limit=limit)

    def get_job(self, db: Session, job_id: int) -> JobListing:
        job = job_repository.get_by_id(db, job_id)
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job listing not found")
        return job

    def create_job(self, db: Session, job_in: JobCreate) -> JobListing:
        return job_repository.create(db, job_in.model_dump())

    def update_job(self, db: Session, job_id: int, job_in: JobUpdate) -> JobListing:
        job = self.get_job(db, job_id)
        return job_repository.update(db, job, job_in.model_dump(exclude_unset=True))

    def delete_job(self, db: Session, job_id: int) -> bool:
        job = self.get_job(db, job_id)
        return job_repository.delete(db, job.id)

    # Applications
    def apply_for_job(self, db: Session, job_id: int, app_in: ApplicationCreate) -> JobApplication:
        self.get_job(db, job_id)  # verify job exists
        data = app_in.model_dump()
        data["job_id"] = job_id
        return application_repository.create(db, data)

    def get_applications(self, db: Session, skip: int = 0, limit: int = 100) -> List[JobApplication]:
        return application_repository.get_all(db, skip=skip, limit=limit)

    def get_application(self, db: Session, app_id: int) -> JobApplication:
        app = application_repository.get_by_id(db, app_id)
        if not app:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
        return app

    def update_application(self, db: Session, app_id: int, app_in: ApplicationUpdate) -> JobApplication:
        app = self.get_application(db, app_id)
        return application_repository.update(db, app, app_in.model_dump(exclude_unset=True))

    def delete_application(self, db: Session, app_id: int) -> bool:
        app = self.get_application(db, app_id)
        return application_repository.delete(db, app.id)

job_service = JobService()
