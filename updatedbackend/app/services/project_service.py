from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.project_repository import project_repository
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.models.project import Project
from app.utils.slugify import slugify

class ProjectService:
    def get_projects(self, db: Session, active_only: bool = True, skip: int = 0, limit: int = 100) -> List[Project]:
        if active_only:
            return project_repository.get_active(db, skip=skip, limit=limit)
        return project_repository.get_all(db, skip=skip, limit=limit)

    def get_project(self, db: Session, project_id: int) -> Project:
        project = project_repository.get_by_id(db, project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        return project

    def create_project(self, db: Session, project_in: ProjectCreate) -> Project:
        slug = project_in.slug or slugify(project_in.title)
        existing = project_repository.get_by_slug(db, slug)
        if existing:
            slug = f"{slug}-{int(db.query(Project).count()) + 1}"
        
        data = project_in.model_dump()
        data["slug"] = slug
        return project_repository.create(db, data)

    def update_project(self, db: Session, project_id: int, project_in: ProjectUpdate) -> Project:
        project = self.get_project(db, project_id)
        data = project_in.model_dump(exclude_unset=True)
        if "title" in data and "slug" not in data:
            data["slug"] = slugify(data["title"])
        return project_repository.update(db, project, data)

    def delete_project(self, db: Session, project_id: int) -> bool:
        project = self.get_project(db, project_id)
        return project_repository.delete(db, project.id)

project_service = ProjectService()
