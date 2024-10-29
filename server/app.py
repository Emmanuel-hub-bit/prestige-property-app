from flask import Flask, jsonify, request, make_response

#  handling migrations packages
from flask_migrate import Migrate
from datetime import datetime, timedelta

from werkzeug.security import generate_password_hash, check_password_hash

# generation token and reset passwords
import base64
import random 
import string

# protection of routes packages
import jwt
import os 

# Handling cross origin requests
from flask_cors import CORS

# Models importat
from models.user import User
from models.favorite import Favorite
from models.house import House
from models.transaction import Transaction

# dbconfig importatition
from utils.dbconfig import db

# Configuring the application
app = Flask(__name__)

CORS(app=app)
# Database configuration and initialization
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

db.init_app(app)
migrate = Migrate(app, db)

# Secret key for JWT generations
secret_key = base64.b64encode(os.urandom(24)).decode('utf-8')
# welcome route
@app.route('/')
def home():
    return jsonify(message="Hello, World!")

# register route 
@app.route('/register', methods=['POST'])
def register():
    # signup details
    data = request.get_json()
    
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username,email=email,password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'Registration successfull'})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    
    if user and check_password_hash(user.password, password):
        expiration_time = datetime.utcnow() + timedelta(hours=1)
        token = jwt.encode({'user_id': user.id, 'exp': expiration_time},secret_key,algorithm='HS256')
        print(token)
        return jsonify({'message' : 'Login successful' , 'token': token})
    else:
        return jsonify({'message' : 'Invalid user credentials.'})

# helper function to decode jwt 
def decode_token(token):
    try:
        payload = jwt.decode(token,secret_key,algorithms='HS256')
        return payload
    except jwt.ExpiredSignatureError:
        return 'Token has expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token provided'

@app.route('/properties', methods=['POST'])
def create_property_power():    
    data = request.get_json()
    
    name = data.get('name')
    description = data.get('description')
    location = data.get('location')  # Corrected to location
    price = data.get('price')
    image = data.get('image')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    house_type = data.get('house_type')
    listed_date = data.get('listed_date')  # String date from JSON

    # Validate that no fields are missing
    if not (name and description and location and price and image and latitude and longitude and house_type and listed_date):
        return jsonify({"errors": "All fields are required."}), 400

    
    # Create new property instance
    new_property = House(
        name=name,
        description=description,
        location=location,
        price=price,
        image=image,
        latitude=latitude,
        longitude=longitude,
        house_type=house_type,
        listed_date=listed_date
    )
    
    try:
        db.session.add(new_property)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": "An error occurred while saving the property: " + str(e)}), 500

    # Prepare response data
    property_dict = {
        "name": new_property.name,
        "description": new_property.description,
        "location": new_property.location,
        "price": new_property.price,
        "image": new_property.image,
        "latitude": new_property.latitude,
        "longitude": new_property.longitude,
        "house_type": new_property.house_type,
        "listed_date": new_property.listed_date
    }

    return jsonify(property_dict), 201
    
# Get all properties
@app.route('/properties', methods=["GET"])
def properties():
    properties_list = []
    for property in House.query.all():
        properties_list.append({
            "id": property.id,
            "name": property.name,
            "description": property.description,
            "location": property.location,
            "price" : property.price,
            "image": property.image,
            "latitude": property.latitude,
            "longitude": property.longitude,
            "house_type": property.house_type,
            "listed_date": property.listed_date
            
        })
    return jsonify(properties_list), 200

@app.route('/users', methods=["GET"])
def get_users():
    users_list = []
    for user in User.query.all():
        users_list.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "password": user.password,
            "role" : user.role,
            "created_at": user.created_at
            
        })
    return jsonify(users_list), 200

# Post favorite property
@app.route('/properties/<int:property_id>/favorite', methods=['POST'])
def add_property_to_favorites(property_id):    
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Authorization credentials missing'}), 401
    try:
        token = token.split(' ')[1]
    except IndexError:
        return jsonify({'message': 'Invalid token format'}), 401

    payload = decode_token(token)
    if isinstance(payload, str):  
        return jsonify({'message': payload}), 401
    
    # Retrieve user_id from decoded token Check if the user and property exist
    user_id = payload.get('user_id')
    user = User.query.get(user_id)
    property = House.query.get(property_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404    
    if not property:
        return jsonify({"error": "Property not found"}), 404
    
    # Check if this property is already in the user's favorites
    existing_favorite = Favorite.query.filter_by(user_id=user_id, house_id=property_id).first()
    if existing_favorite:
        return jsonify({"message": "Property is already in favorites"}), 200    
    new_favorite = Favorite(user_id=user_id, house_id=property_id)
    
    try:
        db.session.add(new_favorite)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"An error occurred while adding to favorites: {str(e)}"}), 500
    
    favorite_dict = {
        "user_id": new_favorite.user_id,
        "property_id": new_favorite.house_id,
        "favorite_id": new_favorite.id
    }    
    return jsonify({"message": "Property added to favorites", "favorite": favorite_dict}), 201



# Properties get by id, patch and delete
@app.route('/properties/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def property_by_id(id):
    
    property = House.query.filter(House.id == id).first()
    if property == None:
        return jsonify({"message": "Property not found."})
    else:
        if request.method == 'GET':                
            property_dict = property.to_dict()
            return jsonify(property_dict), 200 
                   

        elif request.method == 'PATCH':
            try:                
                data = request.get_json()
                
                name = data.get('name')
                description = data.get('description')
                location = data.get('location')
                price = data.get('price')
                image = data.get('image')
                latitude = data.get('latitude')
                longitude = data.get('longitude')
                house_type = data.get('house_type')
                listed_date = data.get('listed_date')
    
                if not name and not description and not location and not price and not image and not latitude and not longitude and not house_type and not listed_date:
                    return jsonify({"errors": "All fields are required."}), 400
    
                # Update the property data
                property.name = name
                property.description = description
                property.location = location
                property.price = price
                property.image = image
                property.latitude = latitude
                property.longitude = longitude 
                property.househouse_type =house_type
                property.listedlisted_date =listed_date

                db.session.add(property)
                db.session.commit()
                
                # Response after successful property update
                updated_property_dict = {
                    "name": property.name, 
                    "description": property.description,
                    "location": property.location, 
                    "price": property.price, 
                    "image": property.image, 
                    "latitude": property.latitude,
                    "longitude": property.longitude, 
                    "house_type": property.househouse_type, 
                    "listed_date": property.listed_date ,              
                    }
                return jsonify(updated_property_dict), 200
            
            # Handle validation errors
            except ValueError as ve:
                return jsonify({"erros": [str(ve)]}), 400
            
        # Fetch the property by its id
        
        elif request.method == 'DELETE':
            property = House.query.filter_by(id=id).first()

            if not property:
                return make_response(jsonify({"errors": ["Property not found"]}), 404)

            try:
                # Delete the property 
                db.session.delete(property)
                db.session.commit()
                return make_response(jsonify({"message": "Property deleted successfully"}), 200)

            except Exception as e:
                db.session.rollback()  
                return make_response(jsonify({"errors": [str(e)]}), 500)

# Get all favourites 
@app.route('/favorites', methods=["GET"])
def favorites():
    favorite_list = []
    for favorite in Favorite.query.all():
        favorite_list.append({
            "id": favorite.id,
            "name": favorite.name,
            "description": favorite.description,
            "location": favorite.description,
            "price" : favorite.price,
            "image": favorite.image,
            "latitude": favorite.latitude,
            "longitude": favorite.longitude,
            "house_type": favorite.house_type,
            "listed_date": favorite.listed_date
            
        })
    return jsonify(favorite_list), 200

@app.route('/favorites/<int:id>', methods=["DELETE"])
def delete_favorite(id):
    favorite = Favorite.query.filter_by(id=id).first()

    if not favorite:
        return make_response(jsonify({"errors": ["Favorite Property not found"]}), 404)

    try:
        # Delete the favorite
        db.session.delete(favorite)
        db.session.commit()
        return make_response(jsonify({"message": "Favorite Property deleted successfully"}), 200)

    except Exception as e:
        db.session.rollback()  
        return make_response(jsonify({"errors": [str(e)]}), 500)

if __name__ == '__main__':
    app.run(port=5555, debug=True)