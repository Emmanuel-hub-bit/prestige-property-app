from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from utils.dbconfig import db

class PropertyTransaction(db.Model, SerializerMixin):
    __tablename__ = 'property_transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, 
        db.ForeignKey('users.id', name='fk_property_transaction_user_id'), 
        nullable=False
    )
    property_id = db.Column(
        db.Integer, 
        db.ForeignKey('properties.id', name='fk_property_transaction_property_id'), 
        nullable=False
    )
    amount = db.Column(db.Float, nullable=False)
    transaction_date = db.Column(db.DateTime, default=datetime.utcnow)
    payment_method = db.Column(db.String(50), nullable=False)

    # Relationships
    property = db.relationship('Property', back_populates='transactions')
    user = db.relationship('User', back_populates='transactions')
