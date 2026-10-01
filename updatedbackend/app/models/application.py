from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from app.core.database import Base

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("job_listings.id", ondelete="CASCADE"), nullable=False)
    applicant_name = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=True)
    resume_url = Column(String, nullable=False)
    cover_letter = Column(Text, nullable=True)
    status = Column(String, default="submitted", index=True)  # submitted, reviewed, interviewed, rejected, hired
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
