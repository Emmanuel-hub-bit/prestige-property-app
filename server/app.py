from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import base64
import os
import jwt
from flask_cors import CORS
from models.user import User
from models.favorite import Favorite
from models.property import Property
from utils.dbconfig import db
from models.property_transaction import PropertyTransaction

import sys
# import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))


# Configuring the application
app = Flask(__name__)
# CORS(app, origins=[ "https://prestige-property-app-3.onrender.com", "https://prestige-property-app-2.onrender.com"])
CORS(app, 
     origins=["https://prestige-property-app-3.onrender.com"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"])

# Database configuration and initialization
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()  # Ensure all tables are created

# Secret key for JWT generations
# Changed this to set the SECRET_KEY in the app config
app.config['SECRET_KEY'] = base64.b64encode(os.urandom(24)).decode('utf-8')

# Welcome route
@app.route('/')
def home():
    return jsonify(message="Hello, World!")

# Register route 
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print("Received data:", data)

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists.'}), 400
    
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username, email=email, password=hashed_password)
    print("New user object before adding to session:", new_user)
    
    # db.session.add(new_user)
    # db.session.commit()
    
    # return jsonify({'message': 'Registration successful'})
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Registration successful'}), 201
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        print("Error occurred while saving user:", e)
        return jsonify({'message': 'Failed to register user.'}), 500


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Received login data:", data)

    email = data.get('email')
    password = data.get('password')
    
    try:
        user = User.query.filter_by(email=email).first()
    except Exception as e:
        print("Error querying user:", e)
        return jsonify({'message': 'Internal server error.'}), 500

    if user and check_password_hash(user.password, password):
        try:
            token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(hours=1)
            }, app.config['SECRET_KEY'], algorithm='HS256')
            return jsonify({'message': 'Login successful', 'token': token}), 200
        except Exception as e:
            print("Error generating token:", e)
            return jsonify({'message': 'Failed to generate token.'}), 500

    return jsonify({'message': 'Invalid email or password.'}), 401



# Helper function to decode JWT 
def decode_token(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])  # Changed to use app.config['SECRET_KEY']
        return payload
    except jwt.ExpiredSignatureError:
        return 'Token has expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token provided'

@app.route('/properties', methods=['POST'])
def create_property():
    data = request.get_json()

    name = data.get('name')
    location = data.get('location')
    price = data.get('price')
    image = data.get('image')

    # Validate that required fields are present
    if not (name and location and price and image):
        return jsonify({"errors": "All fields are required."}), 400

    # Create new property instance
    new_property = Property(
        name=name,
        location=location,
        price=price,
        image=image
    )

    try:
        db.session.add(new_property)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": "An error occurred while saving the property: " + str(e)}), 500

    # Prepare response data
    property_dict = {
        "id": new_property.id,
        "name": new_property.name,
        "location": new_property.location,
        "price": new_property.price,
        "image": new_property.image,
    }

    return jsonify(property_dict), 201

# Get all properties
@app.route('/properties', methods=["GET"])
def get_all_properties():
    properties_list = []
    for property in Property.query.all():
        properties_list.append({
            "id": property.id,
            "name": property.name,
            "location": property.location,
            "price": property.price,
            "image": property.image,
        })
    return jsonify(properties_list), 200

@app.route('/properties/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def property_by_id(id):
    property = Property.query.filter(Property.id == id).first()
    if property is None:
        return jsonify({"message": "Property not found."}), 404

    if request.method == 'GET':
        property_dict = {
            "id": property.id,
            "name": property.name,
            "location": property.location,
            "price": property.price,
            "image": property.image,
        }
        return jsonify(property_dict), 200 

    elif request.method == 'PATCH':
        try:
            data = request.get_json()
            # Update the property data
            if 'name' in data:
                property.name = data['name']
            if 'location' in data:
                property.location = data['location']
            if 'price' in data:
                property.price = data['price']
            if 'image' in data:
                property.image = data['image']

            db.session.commit()

            # Response after successful property update
            updated_property_dict = {
                "id": property.id,
                "name": property.name,
                "location": property.location,
                "price": property.price,
                "image": property.image,
            }
            return jsonify(updated_property_dict), 200
        
        except ValueError as ve:
            return jsonify({"errors": [str(ve)]}), 400
        
    elif request.method == 'DELETE':
        try:
            db.session.delete(property)
            db.session.commit()
            return jsonify({"message": "Property deleted successfully"}), 200
        except Exception as e:
            db.session.rollback()  
            return jsonify({"errors": [str(e)]}), 500


# Get all favorites 
@app.route('/favorites', methods=["GET"])
def get_all_favorites():
    favorite_list = []
    for favorite in Favorite.query.all():
        favorite_list.append({
            "id": favorite.id,
            "name": favorite.property.name,
            "location": favorite.property.location,
            "price": favorite.property.price,
            "image": favorite.property.image,
        })
    return jsonify(favorite_list), 200


# if __name__ == '__main__':
    # app.run(port=5555, debug=True)

if __name__ == "__main__":
    app.run(port=5555, host='0.0.0.0', debug=False)
