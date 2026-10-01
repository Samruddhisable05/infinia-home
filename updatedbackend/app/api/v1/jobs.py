from typing import List
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.job import JobCreate, JobUpdate, JobOut
from app.schemas.application import ApplicationCreate, ApplicationUpdate, ApplicationOut
from app.services.job_service import job_service

router = APIRouter(tags=["Careers & Jobs"])

# Jobs APIs
@router.get("/jobs", response_model=List[JobOut])
def get_jobs(
    active_only: bool = Query(True),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return job_service.get_jobs(db, active_only=active_only, skip=skip, limit=limit)

@router.get("/jobs/{id}", response_model=JobOut)
def get_job(
    id: int,
    db: Session = Depends(get_db)
):
    return job_service.get_job(db, job_id=id)

@router.post("/jobs", response_model=JobOut, status_code=status.HTTP_201_CREATED)
def create_job(
    job_in: JobCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return job_service.create_job(db, job_in)

@router.put("/jobs/{id}", response_model=JobOut)
def update_job(
    id: int,
    job_in: JobUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return job_service.update_job(db, job_id=id, job_in=job_in)

@router.delete("/jobs/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    job_service.delete_job(db, job_id=id)
    return None

# Job Applications APIs
@router.post("/jobs/{job_id}/apply", response_model=ApplicationOut, status_code=status.HTTP_201_CREATED)
def apply_for_job(
    job_id: int,
    app_in: ApplicationCreate,
    db: Session = Depends(get_db)
):
    return job_service.apply_for_job(db, job_id=job_id, app_in=app_in)

@router.get("/applications", response_model=List[ApplicationOut])
def get_applications(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return job_service.get_applications(db, skip=skip, limit=limit)

@router.get("/applications/{id}", response_model=ApplicationOut)
def get_application(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return job_service.get_application(db, app_id=id)

@router.put("/applications/{id}", response_model=ApplicationOut)
def update_application(
    id: int,
    app_in: ApplicationUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return job_service.update_application(db, app_id=id, app_in=app_in)

@router.delete("/applications/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    job_service.delete_application(db, app_id=id)
    return None
