import os
from datetime import datetime, timezone
from app.core.database import SessionLocal, Base, engine
from app.models.contact import ContactEnquiry
from app.models.product import Product
from app.models.project import Project
from app.models.gallery import GalleryItem
from app.models.quote import QuoteRequest
from app.models.job import JobListing
from app.models.application import JobApplication
from app.models.blog import BlogPost
from app.models.document import DocumentResource
from app.models.user import User

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Contact Enquiries
        if db.query(ContactEnquiry).count() == 0:
            enquiries = [
                ContactEnquiry(
                    name="Sarah Jenkins",
                    email="sarah.j@apexarchitects.com",
                    phone="+1 (555) 234-5678",
                    company="Apex Architecture Group",
                    subject="Consultation for Commercial Facade Project",
                    message="Hello, we are looking for architectural aluminum systems for a 12-story commercial tower in downtown. Could we schedule a technical consultation?",
                    status="new"
                ),
                ContactEnquiry(
                    name="Michael Chang",
                    email="mchang@urbanbuild.io",
                    phone="+1 (555) 876-5432",
                    company="Urban Build Developers",
                    subject="Bulk Material Specification Inquiry",
                    message="We have an ongoing residential development and want to review your product catalog and technical load testing certificates.",
                    status="read"
                ),
                ContactEnquiry(
                    name="Elena Rostova",
                    email="elena@nordicglazing.eu",
                    phone="+44 20 7946 0912",
                    company="Nordic Glazing Solutions",
                    subject="Partnership & Regional Distribution",
                    message="Interested in becoming an authorized regional distributor for your high-performance facade and window systems in Northern Europe.",
                    status="in_progress"
                ),
            ]
            db.add_all(enquiries)
            print("Seeded 3 Contact Enquiries.")

        # 2. Products
        if db.query(Product).count() == 0:
            products = [
                Product(
                    name="Infinia SlimLine 77 Sliding Door",
                    slug="infinia-slimline-77-sliding-door",
                    short_description="Ultra-slim minimalist thermal break sliding door system.",
                    description="Engineered for maximum panoramic views, the SlimLine 77 combines minimalist sightlines of only 20mm with superior thermal insulation and acoustic damping.",
                    image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                    category="Sliding Systems",
                    specifications={"Sightline": "20mm", "Max Panel Weight": "400kg", "Uw Value": "0.9 W/m²K", "Glass Thickness": "up to 54mm"},
                    is_active=True
                ),
                Product(
                    name="Infinia VisionAir Curtain Wall 50",
                    slug="infinia-visionair-curtain-wall-50",
                    short_description="High-rise structural glazed facade system for complex geometries.",
                    description="A versatile stick and unitized curtain wall system designed to meet high wind load resistance, air-tightness, and seismic displacement standards.",
                    image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
                    category="Facade Systems",
                    specifications={"System Depth": "50mm to 250mm", "Thermal Insulation": "Passive House Certified", "Wind Resistance": "3000 Pa", "Water Tightness": "1200 Pa"},
                    is_active=True
                ),
                Product(
                    name="Infinia Horizon Pivot Entrance Door",
                    slug="infinia-horizon-pivot-entrance-door",
                    short_description="Grand oversized pivot door with integrated smart biometric entry.",
                    description="Make a bold entrance statement. Capable of supporting dimensions up to 3m wide and 4.5m high with effortless magnetic dampening pivot mechanisms.",
                    image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                    category="Entrance Doors",
                    specifications={"Max Height": "4500mm", "Max Width": "3000mm", "Security Grade": "RC3 / PAS 24", "Biometrics": "Integrated Fingerprint / Keyless"},
                    is_active=True
                ),
            ]
            db.add_all(products)
            db.commit()
            print("Seeded 3 Products.")

        # Query products to link in quote requests
        first_product = db.query(Product).first()
        prod_id = first_product.id if first_product else None

        # 3. Projects
        if db.query(Project).count() == 0:
            projects = [
                Project(
                    title="The Lumina Waterfront Residences",
                    slug="lumina-waterfront-residences",
                    description="Luxury multi-unit waterfront development featuring full-height Infinia SlimLine glazing and motorized acoustic sliders.",
                    location="Miami, FL, USA",
                    client="Horizon Luxury Living",
                    project_type="Residential High-Rise",
                    completion_year="2025",
                    cover_image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
                    is_active=True
                ),
                Project(
                    title="Aura Innovation & Tech Hub",
                    slug="aura-innovation-tech-hub",
                    description="State-of-the-art corporate headquarters featuring 14,000 sqm of dynamic unitized curtain wall facade with solar control glass.",
                    location="Austin, TX, USA",
                    client="Aura Enterprises Global",
                    project_type="Commercial Office",
                    completion_year="2024",
                    cover_image="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
                    is_active=True
                ),
                Project(
                    title="Villa Bella Vista",
                    slug="villa-bella-vista",
                    description="Private ultra-luxury hillside estate featuring custom frameless glass corners and automated oversized pivot entrance systems.",
                    location="Lake Como, Italy",
                    client="Private Client",
                    project_type="Private Villa",
                    completion_year="2025",
                    cover_image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
                    is_active=True
                ),
            ]
            db.add_all(projects)
            db.commit()
            print("Seeded 3 Projects.")

        # Query first project
        first_project = db.query(Project).first()
        proj_id = first_project.id if first_project else None

        # 4. Gallery Items
        if db.query(GalleryItem).count() == 0:
            gallery = [
                GalleryItem(
                    title="Panoramic Living Room Glazing",
                    description="Zero-threshold floor-to-ceiling glass installation with integrated drainage channel.",
                    image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
                    category="Interior / Living",
                    project_id=proj_id,
                    is_active=True
                ),
                GalleryItem(
                    title="Atrium Facade Structural Geometry",
                    description="Triple-glazed curved curtain wall grid engineered for high acoustic insulation.",
                    image="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
                    category="Architecture / Facade",
                    project_id=proj_id,
                    is_active=True
                ),
                GalleryItem(
                    title="Minimalist Pivot Entrance System",
                    description="Matte black anodized aluminum finish with brushed bronze concealed pull handle.",
                    image="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
                    category="Doors / Entrances",
                    project_id=proj_id,
                    is_active=True
                ),
            ]
            db.add_all(gallery)
            print("Seeded 3 Gallery Items.")

        # 5. Quote Requests
        if db.query(QuoteRequest).count() == 0:
            quotes = [
                Contact_Quote := QuoteRequest(
                    name="David Miller",
                    company="Skyline General Contracting",
                    email="dmiller@skylinebuild.com",
                    phone="+1 (555) 349-8821",
                    product_id=prod_id,
                    quantity="45 Units (Custom Sizes)",
                    location="Chicago, IL",
                    message="Requesting a formal quotation including shipping lead times for our upcoming commercial hotel project.",
                    status="pending"
                ),
                QuoteRequest(
                    name="Sophia Lorenzi",
                    company="Lorenzi Interior Design Studio",
                    email="sophia@lorenzidesign.it",
                    phone="+39 02 8901 2345",
                    product_id=prod_id,
                    quantity="8 Sets",
                    location="Milan, Italy",
                    message="Need supply and installation quote for high-end residential renovation project.",
                    status="reviewed"
                ),
                QuoteRequest(
                    name="Liam O'Connor",
                    company="Apex Horizon Projects Ltd",
                    email="loconnor@apexhorizon.co.uk",
                    phone="+44 20 8123 4567",
                    product_id=prod_id,
                    quantity="120 sqm Curtain Wall",
                    location="London, UK",
                    message="Bespoke engineering specs and thermal performance quote required for tender submission.",
                    status="quoted"
                ),
            ]
            db.add_all(quotes)
            print("Seeded 3 Quote Requests.")

        # 6. Job Openings
        if db.query(JobListing).count() == 0:
            jobs = [
                JobListing(
                    title="Senior Facade Engineer",
                    department="Engineering & R&D",
                    location="New York, NY (Hybrid)",
                    employment_type="Full-time",
                    description="Lead the structural and thermal analysis of bespoke architectural glass and aluminum systems for signature architectural developments.",
                    requirements="B.S./M.S. in Structural or Mechanical Engineering, 5+ years experience in aluminum facade design, proficiency in AutoCAD/Rhino.",
                    experience="5+ Years",
                    is_active=True
                ),
                JobListing(
                    title="Technical Project Manager",
                    department="Operations",
                    location="Austin, TX (On-site)",
                    employment_type="Full-time",
                    description="Manage project lifecycles from shop drawing review through to fabrication, supply chain, and on-site contractor installation.",
                    requirements="PMP Certification preferred, strong construction management background with architectural glazing systems.",
                    experience="3-5 Years",
                    is_active=True
                ),
                JobListing(
                    title="Architectural Sales Consultant",
                    department="Sales & Business Development",
                    location="Remote (USA / Europe)",
                    employment_type="Full-time",
                    description="Build partnerships with leading architectural firms, specifiers, and facade consultants to drive product specification and commercial growth.",
                    requirements="Demonstrated track record selling high-end building materials or fenestration systems to architects.",
                    experience="3+ Years",
                    is_active=True
                ),
            ]
            db.add_all(jobs)
            db.commit()
            print("Seeded 3 Job Openings.")

        # Query first job
        first_job = db.query(JobListing).first()
        job_id = first_job.id if first_job else 1

        # 7. Job Applications
        if db.query(JobApplication).count() == 0:
            applications = [
                JobApplication(
                    job_id=job_id,
                    applicant_name="Alexander Vance",
                    email="alex.vance@gmail.com",
                    phone="+1 (555) 765-4321",
                    resume_url="https://example.com/resumes/alex-vance-resume.pdf",
                    cover_letter="With over 6 years of experience specializing in high-performance curtain walls and unitized systems, I am excited about the opportunity at Infinia.",
                    status="submitted"
                ),
                JobApplication(
                    job_id=job_id,
                    applicant_name="Camila Rodriguez",
                    email="c.rodriguez@facadedesign.org",
                    phone="+1 (555) 432-1098",
                    resume_url="https://example.com/resumes/camila-rodriguez-cv.pdf",
                    cover_letter="I have extensive background in FEA structural analysis and parametric modeling for complex glass envelopes.",
                    status="reviewed"
                ),
                JobApplication(
                    job_id=job_id,
                    applicant_name="Marcus Thorne",
                    email="m.thorne@buildeng.co.uk",
                    phone="+44 7700 900123",
                    resume_url="https://example.com/resumes/marcus-thorne-resume.pdf",
                    cover_letter="Experienced in delivering multi-million pound facade packages across commercial real estate sectors in London and Frankfurt.",
                    status="interviewed"
                ),
            ]
            db.add_all(applications)
            print("Seeded 3 Job Applications.")

        # 8. Blog Posts
        if db.query(BlogPost).count() == 0:
            blogs = [
                BlogPost(
                    title="The Future of Thermal Efficiency in Contemporary Architecture",
                    slug="future-thermal-efficiency-contemporary-architecture",
                    excerpt="Exploring new innovations in thermal breaks, aerogel insulation, and vacuum-insulated glazing for net-zero buildings.",
                    content="As sustainable architecture standards like LEED Platinum and Passivhaus become industry benchmarks, the role of fenestration engineering has evolved from passive barrier to active climate modulator. In this article, we break down key considerations...",
                    cover_image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
                    author="Dr. Julian Hayes",
                    is_published=True,
                    published_at=datetime.now(timezone.utc)
                ),
                BlogPost(
                    title="Designing with Slim Sightlines: Balancing Structural Integrity & Aesthetics",
                    slug="designing-with-slim-sightlines-structural-integrity",
                    excerpt="How advanced alloy formulations and engineered interlocks enable ultra-thin 20mm profiles without compromising wind resistance.",
                    content="Architects have long sought the elusive 'invisible frame'—maximizing glass-to-wall ratios. Modern metallurgical advancements have now made it possible to achieve minimal profiles while handling severe wind load pressures...",
                    cover_image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
                    author="Marcus Vance",
                    is_published=True,
                    published_at=datetime.now(timezone.utc)
                ),
                BlogPost(
                    title="Acoustic Insulation Guide for Urban Real Estate Developments",
                    slug="acoustic-insulation-guide-urban-real-estate",
                    excerpt="A comprehensive guide to Rw + Ctr acoustic ratings, laminated glass configurations, and sound transmission control.",
                    content="In bustling metropolitan centres, acoustic comfort is as crucial as thermal performance. Understanding the difference between STC, Rw, and decibel reduction spectra is vital when specifying systems for high-traffic environments...",
                    cover_image="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
                    author="Elena Morales",
                    is_published=True,
                    published_at=datetime.now(timezone.utc)
                ),
            ]
            db.add_all(blogs)
            print("Seeded 3 Blog Posts.")

        # 9. Document Resources / Downloads
        if db.query(DocumentResource).count() == 0:
            docs = [
                DocumentResource(
                    title="Infinia 2026 Architectural Systems Master Catalog",
                    description="Comprehensive 120-page specification guide covering all sliding, facade, pivot, and window profiles.",
                    file_url="https://example.com/downloads/infinia-2026-master-catalog.pdf",
                    file_type="pdf",
                    category="Catalogs & Brochures",
                    is_active=True
                ),
                DocumentResource(
                    title="SlimLine 77 CAD & BIM Revit Models Package",
                    description="Standard section details in DWG, DXF, and Autodesk Revit (.rfa) format for architects and designers.",
                    file_url="https://example.com/downloads/infinia-slimline77-cad-bim.zip",
                    file_type="zip",
                    category="CAD / BIM Files",
                    is_active=True
                ),
                DocumentResource(
                    title="Thermal & Structural Testing Compliance Certificates",
                    description="Official European EN & American ASTM certified test reports for wind load, water tightness, and acoustic ratings.",
                    file_url="https://example.com/downloads/infinia-certification-reports.pdf",
                    file_type="pdf",
                    category="Technical Certificates",
                    is_active=True
                ),
            ]
            db.add_all(docs)
            print("Seeded 3 Document Resources.")

        db.commit()
        print("Database seeded successfully with all 3 dummy items per category!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
