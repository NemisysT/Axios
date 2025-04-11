# app.py
from flask import Flask
import os
from routes.internship_routes import internship_blueprint
from routes.auth import auth_blueprint
# from routes.unstop_routes import internship_bp
from flask_cors import CORS

# Import the blueprint from main.py
from routes.resumeRoute import main_blueprint
from routes.auth import auth_blueprint
# from routes.unstop_routes import internship_bp
from routes.linkedin_routes import linkedin_bp
from controllers.unstop_controller import scraper_bp

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'pdf'}
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

cors_options = {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
        "supports_credentials": True
    }

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)


# Register the blueprint
app.register_blueprint(main_blueprint)
app.register_blueprint(internship_blueprint, url_prefix='/api/internships')
app .register_blueprint(auth_blueprint, url_prefix='/user')
# app.register_blueprint(internship_bp)
app.register_blueprint(linkedin_bp)
app.register_blueprint(scraper_bp,url_prefix='/api/v1')
if __name__ == '__main__':
    app.run(debug=True)