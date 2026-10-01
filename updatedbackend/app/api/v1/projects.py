from typing import List
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectOut
from app.services.project_service import project_service

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectOut])
def get_projects(
    active_only: bool = Query(True),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return project_service.get_projects(db, active_only=active_only, skip=skip, limit=limit)

@router.get("/{id}", response_model=ProjectOut)
def get_project(
    id: int,
    db: Session = Depends(get_db)
):
    return project_service.get_project(db, project_id=id)

@router.post("", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return project_service.create_project(db, project_in)

@router.put("/{id}", response_model=ProjectOut)
def update_project(
    id: int,
    project_in: ProjectUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return project_service.update_project(db, project_id=id, project_in=project_in)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    project_service.delete_project(db, project_id=id)
    return None
