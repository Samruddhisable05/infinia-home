def test_jobs_and_applications_flow(client, admin_headers):
    # Admin creates job opening
    job_payload = {
        "title": "Civil Quality Engineer",
        "department": "Quality Assurance",
        "location": "Ahmedabad Plant",
        "employment_type": "Full-time",
        "description": "Responsible for testing AAC block compressive strength and quality standards.",
        "requirements": "B.E. Civil with 2+ years experience.",
        "experience": "2-4 years"
    }
    res_job = client.post("/api/jobs", json=job_payload, headers=admin_headers)
    assert res_job.status_code == 201
    job = res_job.json()

    # Public user views open jobs
    res_jobs = client.get("/api/jobs")
    assert res_jobs.status_code == 200
    assert len(res_jobs.json()) >= 1

    # Candidate submits job application
    app_payload = {
        "applicant_name": "Rohan Sharma",
        "email": "rohan@example.com",
        "phone": "+91 91234 56789",
        "resume_url": "/uploads/resumes/rohan_resume.pdf",
        "cover_letter": "I am excited to apply for Civil Quality Engineer position."
    }
    res_app = client.post(f"/api/jobs/{job['id']}/apply", json=app_payload)
    assert res_app.status_code == 201
    assert res_app.json()["applicant_name"] == "Rohan Sharma"

    # Admin reviews applications
    res_apps = client.get("/api/applications", headers=admin_headers)
    assert res_apps.status_code == 200
    assert len(res_apps.json()) >= 1
