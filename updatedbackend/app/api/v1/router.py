from fastapi import APIRouter
from app.api.v1.auth import router as auth_router
from app.api.v1.products import router as products_router
from app.api.v1.projects import router as projects_router
from app.api.v1.gallery import router as gallery_router
from app.api.v1.contact import router as contact_router
from app.api.v1.quotes import router as quotes_router
from app.api.v1.jobs import router as jobs_router
from app.api.v1.blog import router as blog_router
from app.api.v1.documents import router as documents_router
from app.api.v1.uploads import router as uploads_router

api_v1_router = APIRouter()

api_v1_router.include_router(auth_router, prefix="/auth")
api_v1_router.include_router(products_router)
api_v1_router.include_router(projects_router)
api_v1_router.include_router(gallery_router)
api_v1_router.include_router(contact_router)
api_v1_router.include_router(quotes_router)
api_v1_router.include_router(jobs_router)
api_v1_router.include_router(blog_router)
api_v1_router.include_router(documents_router)
api_v1_router.include_router(uploads_router)
