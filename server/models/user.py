from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from utils.dbconfig import db
from models.property_transaction import PropertyTransaction

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    favorites = db.relationship('Favorite', back_populates='user')
    transactions = db.relationship('PropertyTransaction', back_populates='user')