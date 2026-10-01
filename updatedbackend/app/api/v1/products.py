from typing import List
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.product import ProductCreate, ProductUpdate, ProductOut
from app.services.product_service import product_service

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("", response_model=List[ProductOut])
def get_products(
    active_only: bool = Query(True),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return product_service.get_products(db, active_only=active_only, skip=skip, limit=limit)

@router.get("/{id}", response_model=ProductOut)
def get_product(
    id: int,
    db: Session = Depends(get_db)
):
    return product_service.get_product(db, product_id=id)

@router.post("", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_product(
    product_in: ProductCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return product_service.create_product(db, product_in)

@router.put("/{id}", response_model=ProductOut)
def update_product(
    id: int,
    product_in: ProductUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return product_service.update_product(db, product_id=id, product_in=product_in)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    product_service.delete_product(db, product_id=id)
    return None
