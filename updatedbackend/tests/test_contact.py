def test_contact_submission_and_admin_flow(client, admin_headers):
    # Public enquiry submission
    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "+91 98765 43210",
        "company": "Builders Inc",
        "subject": "Bulk Quote Request",
        "message": "Looking for 500 cubic meters of G4 grade AAC blocks."
    }
    res_sub = client.post("/api/contact", json=payload)
    assert res_sub.status_code == 201
    enquiry = res_sub.json()
    assert enquiry["status"] == "new"

    # Admin reads enquiries
    res_admin_list = client.get("/api/contact", headers=admin_headers)
    assert res_admin_list.status_code == 200
    assert len(res_admin_list.json()) >= 1

    # Admin updates enquiry status
    res_upd = client.put(
        f"/api/contact/{enquiry['id']}",
        json={"status": "in_progress"},
        headers=admin_headers
    )
    assert res_upd.status_code == 200
    assert res_upd.json()["status"] == "in_progress"
