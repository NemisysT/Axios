# database/db_connection.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_db_connection():
    """Create a connection to the MongoDB database"""
    try:
        # Get MongoDB connection details from environment variables
        mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
        db_name = os.environ.get('DB_NAME', 'resume_processor_db')
        
        # Connect to MongoDB
        client = MongoClient(mongo_uri)
        db = client[db_name]
        
        return db
    except Exception as e:
        raise Exception(f"Database connection error: {str(e)}")

# Initialize database
def init_database():
    """Initialize database with required collections and indexes"""
    try:
        db = get_db_connection()
        
        # Create collections if they don't exist
        if "resumes" not in db.list_collection_names():
            db.create_collection("resumes")
        
        # Remove model-specific indexes
        db.resumes.create_index("upload_date")
        
        return True
    except Exception as e:
        raise Exception(f"Database initialization error: {str(e)}")