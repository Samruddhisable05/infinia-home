def test_documents_crud_flow(client, admin_headers):
    payload = {
        "title": "Infinia AAC Technical Specification Sheet 2026",
        "description": "Comprehensive engineering specs and test certificate",
        "file_url": "/uploads/documents/spec_sheet.pdf",
        "file_type": "pdf",
        "category": "Brochures"
    }
    res_doc = client.post("/api/documents", json=payload, headers=admin_headers)
    assert res_doc.status_code == 201
    doc = res_doc.json()
    assert doc["title"] == "Infinia AAC Technical Specification Sheet 2026"

    res_list = client.get("/api/documents")
    assert res_list.status_code == 200
    assert len(res_list.json()) >= 1
