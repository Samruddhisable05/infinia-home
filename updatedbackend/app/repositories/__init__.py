from app.repositories.base import BaseRepository
from app.repositories.user_repository import user_repository, UserRepository
from app.repositories.product_repository import product_repository, ProductRepository
from app.repositories.project_repository import project_repository, ProjectRepository
from app.repositories.gallery_repository import gallery_repository, GalleryRepository
from app.repositories.contact_repository import contact_repository, ContactRepository
from app.repositories.quote_repository import quote_repository, QuoteRepository
from app.repositories.job_repository import job_repository, JobRepository
from app.repositories.application_repository import application_repository, ApplicationRepository
from app.repositories.blog_repository import blog_repository, BlogRepository
from app.repositories.document_repository import document_repository, DocumentRepository

__all__ = [
    "BaseRepository",
    "user_repository", "UserRepository",
    "product_repository", "ProductRepository",
    "project_repository", "ProjectRepository",
    "gallery_repository", "GalleryRepository",
    "contact_repository", "ContactRepository",
    "quote_repository", "QuoteRepository",
    "job_repository", "JobRepository",
    "application_repository", "ApplicationRepository",
    "blog_repository", "BlogRepository",
    "document_repository", "DocumentRepository",
]
