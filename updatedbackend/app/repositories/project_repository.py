from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.project import Project
from app.repositories.base import BaseRepository

class ProjectRepository(BaseRepository[Project]):
    def __init__(self):
        super().__init__(Project)

    def get_by_slug(self, db: Session, slug: str) -> Optional[Project]:
        return db.query(Project).filter(Project.slug == slug).first()

    def get_active(self, db: Session, skip: int = 0, limit: int = 100) -> List[Project]:
        return db.query(Project).filter(Project.is_active == True).offset(skip).limit(limit).all()

project_repository = ProjectRepository()
