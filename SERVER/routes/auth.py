from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from database.db_connection import get_db_connection
import bcrypt
import jwt
import datetime
import os

auth_blueprint = Blueprint('auth', __name__)

# Load from .env
JWT_SECRET = os.getenv("JWT_SECRET", "your_fallback_secret")
JWT_ALGORITHM = 'HS256'

@auth_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    if not name or not email or not password:
        return jsonify({'message': 'All fields are required'}), 400

    db = get_db_connection()
    users_collection = db.users

    # Check if user exists
    if users_collection.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    hashed_password_str = hashed_password.decode('utf-8')


    user_data = {
        'name': name,
        'email': email,
        'password': hashed_password_str,
        'created_at': datetime.datetime.utcnow()
    }

    users_collection.insert_one(user_data)

    # Generate JWT
    payload = {
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return jsonify({
        'message': 'User created successfully',
        'token': token,
        'user': {
            'name': name,
            'email': email
        }
    }), 201


@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password required'}), 400

    db = get_db_connection()
    users_collection = db.users

    user = users_collection.find_one({'email': email})

    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401

    
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'message': 'Invalid credentials'}), 401


    payload = {
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': {
            'name': user['name'],
            'email': user['email']
        }
    }), 200
