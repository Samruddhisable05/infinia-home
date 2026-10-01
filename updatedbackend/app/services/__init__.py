from app.services.auth_service import auth_service, AuthService
from app.services.product_service import product_service, ProductService
from app.services.project_service import project_service, ProjectService
from app.services.gallery_service import gallery_service, GalleryService
from app.services.contact_service import contact_service, ContactService
from app.services.quote_service import quote_service, QuoteService
from app.services.job_service import job_service, JobService
from app.services.blog_service import blog_service, BlogService
from app.services.document_service import document_service, DocumentService

__all__ = [
    "auth_service", "AuthService",
    "product_service", "ProductService",
    "project_service", "ProjectService",
    "gallery_service", "GalleryService",
    "contact_service", "ContactService",
    "quote_service", "QuoteService",
    "job_service", "JobService",
    "blog_service", "BlogService",
    "document_service", "DocumentService",
]
