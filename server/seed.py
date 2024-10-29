from utils.dbconfig import db
from sqlalchemy.exc import IntegrityError
from app import app  # Make sure to import your app
from models.favorite import Favorite
from models.property import Property
from models.property_transaction import PropertyTransaction

def seed_properties():
    properties = [
        {
            "id": 1,
            "name": "Luxury Villa in Kilimani",
            "location": "Kilimani, Nairobi",
            "price": 500000,
            "image": "https://cdn.pixabay.com/photo/2019/11/12/17/48/villa-4621636_640.jpg"  
        },
        {
            "id": 2,
            "name": "Beachfront Apartment in Mombasa",
            "location": "Mombasa, Kenya",
            "price": 300000,
            "image": "https://cdn.pixabay.com/photo/2020/03/21/20/03/real-estate-4955087_640.jpg"  
        },
        {
            "id": 3,
            "name": "Mountain Retreat in Naivasha",
            "location": "Naivasha, Kenya",
            "price": 400000,
            "image": "https://cdn.pixabay.com/photo/2019/11/26/19/41/villa-4655352_640.jpg"  
        },
        {
            "id": 4,
            "name": "Penthouse in Westlands",
            "location": "Westlands, Nairobi",
            "price": 750000,
            "image": "https://cdn.pixabay.com/photo/2020/03/21/20/03/real-estate-4955086_640.jpg"  
        },
        {
            "id": 5,
            "name": "Farmhouse in Nanyuki",
            "location": "Nanyuki, Kenya",
            "price": 600000,
            "image": "https://cdn.pixabay.com/photo/2024/04/16/06/28/ai-generated-8699185_640.jpg"  
        },
        {
            "id": 6,
            "name": "Contemporary Loft in Karen",
            "location": "Karen, Nairobi",
            "price": 450000,
            "image": "https://cdn.pixabay.com/photo/2022/07/09/05/23/house-7310177_640.jpg"  
        },
        {
            "id": 7,
            "name": "Lakefront Villa in Kisumu",
            "location": "Kisumu, Kenya",
            "price": 550000,
            "image": "https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_640.jpg"  
        },
        {
            "id": 8,
            "name": "Modern Apartment in Thika",
            "location": "Thika, Kenya",
            "price": 250000,
            "image": "https://cdn.pixabay.com/photo/2017/03/30/00/24/villa-2186906_640.jpg"  
        },
        {
            "id": 9,
            "name": "Beach House in Diani",
            "location": "Diani, Kenya",
            "price": 550000,
            "image": "https://cdn.pixabay.com/photo/2020/04/28/04/03/villa-5102547_640.jpg"  
        },
        {
            "id": 10,
            "name": "Country Cottage in Limuru",
            "location": "Limuru, Kenya",
            "price": 350000,
            "image": "https://cdn.pixabay.com/photo/2018/02/13/11/09/home-3150500_640.jpg"  
        }
    ]

    with app.app_context():
        # Ensure tables exist
        db.create_all()  # Create tables if they don't exist

        print("Clearing existing property data...")
        db.session.query(Property).delete()
        db.session.commit()

        new_properties = []
        for prop in properties:
            new_property = Property(
                id=prop["id"],
                name=prop["name"],
                location=prop["location"],
                price=prop["price"],
                image=prop["image"]
            )
            new_properties.append(new_property)

        try:
            db.session.bulk_save_objects(new_properties)
            db.session.commit()
            print("Properties seeded successfully!")
        except IntegrityError:
            db.session.rollback()
            print("Failed to seed properties due to integrity error.")

if __name__ == "__main__":
    seed_properties()