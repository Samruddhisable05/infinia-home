from fastapi import APIRouter, UploadFile, File, Form, Depends, status
from app.utils.file_upload import save_uploaded_file

router = APIRouter(tags=["File Uploads"])

@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_file(
    file: UploadFile = File(...),
    subfolder: str = Form("general")
):
    file_url = await save_uploaded_file(file, subfolder=subfolder)
    return {"filename": file.filename, "url": file_url}
