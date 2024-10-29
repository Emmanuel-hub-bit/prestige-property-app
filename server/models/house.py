from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from utils.dbconfig import db

class House(db.Model, SerializerMixin):
    __tablename__ = 'houses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(200), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    house_type = db.Column(db.String(50), nullable=False)
    listed_date = db.Column(db.String, default=datetime.utcnow)

    # Relationships
    favorites = db.relationship('Favorite', back_populates='house')
    transactions = db.relationship('Transaction', back_populates='house')  # Adjust this if Transaction also uses back_populates
