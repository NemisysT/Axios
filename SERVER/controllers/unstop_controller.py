from models.unstopInternships import InternshipModel
from services.unstop_scraper import UnstopScraper

class InternshipController:
    def __init__(self):
        self.model = InternshipModel()
        self.scraper = UnstopScraper()
    
    def get_all_internships(self, filters=None, page=1, per_page=10):
        """Get all internships with optional filtering and pagination"""
        if filters is None:
            filters = {}
            
        try:
            internships, total_count = self.model.find_internships(filters, page, per_page)
            
            return {
                'success': True,
                'count': total_count,
                'page': page,
                'per_page': per_page,
                'total_pages': (total_count + per_page - 1) // per_page,
                'data': internships
            }
        except Exception as e:
            return {
                'success': False,
                'message': f"Error retrieving internships: {str(e)}",
                'data': []
            }
    
    def get_internship_by_id(self, internship_id):
        """Get a specific internship by ID"""
        try:
            internship = self.model.find_by_id(internship_id)
            
            if not internship:
                return {
                    'success': False,
                    'message': 'Internship not found',
                    'data': None
                }
                
            return {
                'success': True,
                'data': internship
            }
        except Exception as e:
            return {
                'success': False,
                'message': f"Error retrieving internship: {str(e)}",
                'data': None
            }
    
    def trigger_scrape_internships(self, filters):
        """Trigger the scraping process"""
        try:
            # Trigger the scraping process
            result = self.scraper.scrape_internships(filters)
            
            return {
                'success': True,
                'message': f"Successfully scraped {result['count']} internships",
                'count': result['count']
            }
        except Exception as e:
            return {
                'success': False,
                'message': f"Scraping error: {str(e)}"
            }
    
    def get_internship_statistics(self):
        """Get statistics about internships"""
        try:
            stats = self.model.get_statistics()
            
            return {
                'success': True,
                'data': stats
            }
        except Exception as e:
            return {
                'success': False,
                'message': f"Error retrieving statistics: {str(e)}",
                'data': None
            }