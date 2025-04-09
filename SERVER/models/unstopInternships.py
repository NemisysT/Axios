from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class InternshipModel:
    def __init__(self):
        # MongoDB Configuration
        mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
        db_name = os.getenv('DB_NAME', 'resume_processor_db')
        collection_name = os.getenv('COLLECTION_NAME', 'unstop')
        
        # Connect to MongoDB
        self.client = MongoClient(mongo_uri)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]
    
    def find_internships(self, filters, page=1, per_page=10):
        """Find internships with optional filters and pagination"""
        # Calculate skip value for pagination
        skip = (page - 1) * per_page
        
        # Get total count for pagination
        total_count = self.collection.count_documents(filters)
        
        # Find internships with filters and pagination
        cursor = self.collection.find(
            filters,
            {'_id': 1, 'title': 1, 'company': 1, 'applicants': 1, 
             'days_left': 1, 'skills': 1, 'category': 1}
        ).skip(skip).limit(per_page)
        
        # Convert ObjectId to string for JSON serialization
        internships = []
        for doc in cursor:
            doc['_id'] = str(doc['_id'])
            internships.append(doc)
        
        return internships, total_count
    
    def find_by_id(self, internship_id):
        """Find an internship by its ID"""
        try:
            # Convert string ID to ObjectId
            object_id = ObjectId(internship_id)
            
            # Find the internship
            internship = self.collection.find_one({'_id': object_id})
            
            if internship:
                # Convert ObjectId to string for JSON serialization
                internship['_id'] = str(internship['_id'])
            
            return internship
        except Exception:
            return None
    
    def get_statistics(self):
        """Get statistics about internships"""
        stats = {
            'total_count': self.collection.count_documents({}),
            'by_category': [],
            'by_company': [],
            'days_left_distribution': []
        }
        
        # Count by category
        pipeline = [
            {'$group': {'_id': '$category', 'count': {'$sum': 1}}},
            {'$sort': {'count': -1}}
        ]
        stats['by_category'] = list(self.collection.aggregate(pipeline))
        
        # Count by company
        pipeline = [
            {'$group': {'_id': '$company', 'count': {'$sum': 1}}},
            {'$sort': {'count': -1}},
            {'$limit': 10}  # Top 10 companies
        ]
        stats['by_company'] = list(self.collection.aggregate(pipeline))
        
        # Distribution by days left
        pipeline = [
            {'$group': {'_id': '$days_left', 'count': {'$sum': 1}}},
            {'$sort': {'_id': 1}}
        ]
        stats['days_left_distribution'] = list(self.collection.aggregate(pipeline))
        
        return stats