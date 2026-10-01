def test_projects_crud(client, admin_headers):
    # Create project
    payload = {
        "title": "Ahmedabad Eco Complex",
        "description": "Commercial building using sustainable AAC blocks",
        "location": "Ahmedabad, India",
        "client": "Infinia Infra",
        "project_type": "Commercial",
        "completion_year": "2025"
    }
    response = client.post("/api/projects", json=payload, headers=admin_headers)
    assert response.status_code == 201
    project = response.json()
    assert project["title"] == "Ahmedabad Eco Complex"

    # Read project
    res_get = client.get(f"/api/projects/{project['id']}")
    assert res_get.status_code == 200

    # Delete project
    res_del = client.delete(f"/api/projects/{project['id']}", headers=admin_headers)
    assert res_del.status_code == 204
