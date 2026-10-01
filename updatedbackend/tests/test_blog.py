def test_blog_crud_flow(client, admin_headers):
    # Admin creates published blog post
    payload = {
        "title": "Why AAC Blocks are the Future of Sustainable Construction",
        "excerpt": "Discover how AAC blocks reduce building weight and carbon footprint.",
        "content": "Autoclaved Aerated Concrete (AAC) is a lightweight, precast, foam concrete building material...",
        "author": "Infinia Tech Team",
        "is_published": True
    }
    res_blog = client.post("/api/blog", json=payload, headers=admin_headers)
    assert res_blog.status_code == 201
    blog = res_blog.json()
    assert blog["slug"] == "why-aac-blocks-are-the-future-of-sustainable-construction"

    # Public reads blogs
    res_list = client.get("/api/blog")
    assert res_list.status_code == 200
    assert len(res_list.json()) >= 1

    # Read by slug
    res_slug = client.get(f"/api/blog/{blog['slug']}")
    assert res_slug.status_code == 200
    assert res_slug.json()["id"] == blog["id"]
