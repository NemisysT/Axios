# app.py
from flask import Flask
import os
from routes.internship_routes import internship_blueprint
from routes.auth import auth_blueprint
from flask_cors import CORS

# Import the blueprint from main.py
from routes.resumeRoute import main_blueprint
from routes.auth import auth_blueprint

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'pdf'}
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

cors_options = {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
        "supports_credentials": True
    }

CORS(app, resources={r"/*": cors_options})

# Register the blueprint
app.register_blueprint(main_blueprint)
app.register_blueprint(internship_blueprint, url_prefix='/api/internships')
app .register_blueprint(auth_blueprint, url_prefix='/user')

if __name__ == '__main__':
    app.run(debug=True)