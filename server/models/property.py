from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from utils.dbconfig import db

class Property(db.Model, SerializerMixin):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(200), nullable=False)

    favorites = db.relationship('Favorite', back_populates='property')
    transactions = db.relationship('PropertyTransaction', back_populates='property')
