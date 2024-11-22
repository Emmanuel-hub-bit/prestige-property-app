from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from utils.dbconfig import db

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, 
        db.ForeignKey('users.id', name='fk_favorite_user_id'), 
        nullable=False
    )
    property_id = db.Column(
        db.Integer, 
        db.ForeignKey('properties.id', name='fk_favorite_property_id'), 
        nullable=False
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', back_populates='favorites')
    property = db.relationship('Property', back_populates='favorites')
