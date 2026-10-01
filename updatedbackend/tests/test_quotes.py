def test_quote_request_flow(client, admin_headers):
    # Public quote submission
    payload = {
        "name": "John Builder",
        "company": "Apex Construction",
        "email": "john@apex.com",
        "phone": "+91 99887 76655",
        "quantity": "1000 blocks",
        "location": "Ahmedabad",
        "message": "Urgent requirement for upcoming residential project."
    }
    res_post = client.post("/api/quotes", json=payload)
    assert res_post.status_code == 201
    quote = res_post.json()
    assert quote["email"] == "john@apex.com"

    # Admin lists quotes
    res_list = client.get("/api/quotes", headers=admin_headers)
    assert res_list.status_code == 200
    assert len(res_list.json()) >= 1
