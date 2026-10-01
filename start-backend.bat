@echo off
cd updatedbackend
echo Starting Backend Development Server...
call .venv\Scripts\activate
uvicorn app.main:app --reload
pause
