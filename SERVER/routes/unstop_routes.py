from flask import Blueprint, request, jsonify
from controllers.unstop_controller import InternshipController

# Create the blueprint for API routes
internship_bp = Blueprint('internships', __name__, url_prefix='/api/internships')
controller = InternshipController()

@internship_bp.route('/list', methods=['GET'])
def api_list_internships():
    """API endpoint to get internships as JSON"""
    # Get query parameters for filtering
    category = request.args.get('category')
    company = request.args.get('company')
    title_search = request.args.get('title')
    days_left = request.args.get('days_left')
    
    # Pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    # Create filters if parameters are provided
    filters = {}
    if category:
        filters['category'] = category
    if company:
        filters['company'] = company
    if title_search:
        filters['title'] = {"$regex": title_search, "$options": "i"}
    if days_left:
        filters['days_left'] = days_left
    
    # Get internships from controller with pagination
    result = controller.get_all_internships(filters, page, per_page)
    
    # Return JSON response
    return jsonify(result)

@internship_bp.route('/<internship_id>', methods=['GET'])
def api_get_internship(internship_id):
    """API endpoint to get a specific internship by ID"""
    result = controller.get_internship_by_id(internship_id)
    return jsonify(result)

@internship_bp.route('/scrape', methods=['POST'])
def api_scrape_internships():
    """API endpoint to trigger internship scraping"""
    data = request.json or {}
    category = data.get('category', 'full-stack-development')
    
    # Optional parameters for more specific scraping
    filters = {
        'category': category,
        'usertype': data.get('usertype', 'fresher'),
        'passing_year': data.get('passing_year', '2027'),
        'quick_apply': data.get('quick_apply', True)
    }
    
    result = controller.trigger_scrape_internships(filters)
    return jsonify(result)

@internship_bp.route('/statistics', methods=['GET'])
def api_internship_statistics():
    """API endpoint to get statistics about internships"""
    result = controller.get_internship_statistics()
    return jsonify(result)