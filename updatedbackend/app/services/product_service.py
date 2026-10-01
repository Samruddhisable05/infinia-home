from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.product_repository import product_repository
from app.schemas.product import ProductCreate, ProductUpdate
from app.models.product import Product
from app.utils.slugify import slugify

class ProductService:
    def get_products(self, db: Session, active_only: bool = True, skip: int = 0, limit: int = 100) -> List[Product]:
        if active_only:
            return product_repository.get_active(db, skip=skip, limit=limit)
        return product_repository.get_all(db, skip=skip, limit=limit)

    def get_product(self, db: Session, product_id: int) -> Product:
        product = product_repository.get_by_id(db, product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        return product

    def create_product(self, db: Session, product_in: ProductCreate) -> Product:
        slug = product_in.slug or slugify(product_in.name)
        existing = product_repository.get_by_slug(db, slug)
        if existing:
            slug = f"{slug}-{int(db.query(Product).count()) + 1}"
        
        data = product_in.model_dump()
        data["slug"] = slug
        return product_repository.create(db, data)

    def update_product(self, db: Session, product_id: int, product_in: ProductUpdate) -> Product:
        product = self.get_product(db, product_id)
        data = product_in.model_dump(exclude_unset=True)
        if "name" in data and "slug" not in data:
            data["slug"] = slugify(data["name"])
        return product_repository.update(db, product, data)

    def delete_product(self, db: Session, product_id: int) -> bool:
        product = self.get_product(db, product_id)
        return product_repository.delete(db, product.id)

product_service = ProductService()
