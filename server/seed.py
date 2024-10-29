from datetime import datetime
from utils.dbconfig import db
from models.house import House  
from sqlalchemy.exc import IntegrityError

def seed_houses():
    houses = [
        House(
            name="Elegant Villa",
            description="A luxurious villa with sea view.",
            location="Diani Beach, Mombasa",
            price=500000.00,
            image="https://example.com/images/elegant_villa.jpg",
            latitude=-4.295657,
            longitude=39.595443,
            house_type="Villa",
            listed_date=datetime(2023, 5, 1)
        ),
        House(
            name="Urban Apartment",
            description="Modern apartment in the heart of the city.",
            location="Westlands, Nairobi",
            price=75000.00,
            image="https://example.com/images/urban_apartment.jpg",
            latitude=-1.270104,
            longitude=36.804555,
            house_type="Apartment",
            listed_date=datetime(2023, 6, 12)
        ),
        # Add 8 more entries here
        House(
            name="Riverside Mansion",
            description="Beautiful riverside mansion with scenic views.",
            location="Riverside, Nairobi",
            price=1000000.00,
            image="https://example.com/images/riverside_mansion.jpg",
            latitude=-1.255071,
            longitude=36.816656,
            house_type="Mansion",
            listed_date=datetime(2023, 8, 22)
        ),
        House(
            name="Cosy Bungalow",
            description="A small and cosy bungalow.",
            location="Karen, Nairobi",
            price=300000.00,
            image="https://example.com/images/cosy_bungalow.jpg",
            latitude=-1.317849,
            longitude=36.712284,
            house_type="Bungalow",
            listed_date=datetime(2023, 9, 5)
        ),
        House(
            name="Luxury Penthouse",
            description="High-end penthouse with a rooftop pool.",
            location="Kilimani, Nairobi",
            price=1200000.00,
            image="https://example.com/images/luxury_penthouse.jpg",
            latitude=-1.292066,
            longitude=36.821946,
            house_type="Penthouse",
            listed_date=datetime(2023, 10, 1)
        ),
        House(
            name="Countryside Cottage",
            description="Quiet cottage in the countryside.",
            location="Nanyuki, Laikipia",
            price=200000.00,
            image="https://example.com/images/countryside_cottage.jpg",
            latitude=0.011224,
            longitude=37.074562,
            house_type="Cottage",
            listed_date=datetime(2023, 7, 15)
        ),
        House(
            name="Modern Townhouse",
            description="Townhouse in a gated community.",
            location="Lavington, Nairobi",
            price=550000.00,
            image="https://example.com/images/modern_townhouse.jpg",
            latitude=-1.269072,
            longitude=36.776724,
            house_type="Townhouse",
            listed_date=datetime(2023, 5, 8)
        ),
        House(
            name="Family Home",
            description="Spacious family home with a large garden.",
            location="Thika Road, Nairobi",
            price=420000.00,
            image="https://example.com/images/family_home.jpg",
            latitude=-1.210493,
            longitude=36.884215,
            house_type="Family Home",
            listed_date=datetime(2023, 4, 20)
        ),
        House(
            name="Studio Apartment",
            description="Compact studio apartment for singles.",
            location="CBD, Nairobi",
            price=30000.00,
            image="https://example.com/images/studio_apartment.jpg",
            latitude=-1.286389,
            longitude=36.817223,
            house_type="Studio",
            listed_date=datetime(2023, 8, 17)
        ),
        House(
            name="Beachfront Cottage",
            description="Charming cottage right on the beach.",
            location="Watamu, Kilifi",
            price=800000.00,
            image="https://example.com/images/beachfront_cottage.jpg",
            latitude=-3.358036,
            longitude=39.850531,
            house_type="Cottage",
            listed_date=datetime(2023, 9, 29)
        ),
    ]

    try:
        db.session.bulk_save_objects(houses)
        db.session.commit()
        print("Database seeded successfully!")
    except IntegrityError:
        db.session.rollback()
        print("Failed to seed database due to integrity error.")

if __name__ == "__main__":
    seed_houses()
