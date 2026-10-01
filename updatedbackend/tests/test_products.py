def test_create_and_get_products(client, admin_headers):
    # Create product as admin
    payload = {
        "name": "Solar AAC Block",
        "description": "High performance lightweight solar concrete block",
        "short_description": "Eco AAC Block",
        "category": "Blocks",
        "specifications": {"density": "600 kg/m3", "compressive_strength": "4.0 N/mm2"}
    }
    response = client.post("/api/products", json=payload, headers=admin_headers)
    assert response.status_code == 201
    prod = response.json()
    assert prod["name"] == "Solar AAC Block"
    assert prod["slug"] == "solar-aac-block"

    # Get products list (public)
    res_list = client.get("/api/products")
    assert res_list.status_code == 200
    items = res_list.json()
    assert len(items) >= 1

    # Get single product
    res_single = client.get(f"/api/products/{prod['id']}")
    assert res_single.status_code == 200
    assert res_single.json()["id"] == prod["id"]

def test_create_product_unauthorized(client):
    payload = {"name": "Unauthorized Block"}
    response = client.post("/api/products", json=payload)
    assert response.status_code == 401
