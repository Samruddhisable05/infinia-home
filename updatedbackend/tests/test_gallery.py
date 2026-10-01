def test_gallery_crud(client, admin_headers):
    payload = {
        "title": "Manufacturing Facility",
        "description": "Automated AAC production line",
        "image": "/uploads/general/plant.jpg",
        "category": "Facility"
    }
    response = client.post("/api/gallery", json=payload, headers=admin_headers)
    assert response.status_code == 201
    item = response.json()
    assert item["title"] == "Manufacturing Facility"

    res_list = client.get("/api/gallery")
    assert res_list.status_code == 200
    assert len(res_list.json()) >= 1
