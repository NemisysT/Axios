# app.py
from flask import Flask
import os
from routes.internship_routes import internship_blueprint

# Import the blueprint from main.py
from routes.resumeRoute import main_blueprint

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'pdf'}
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Register the blueprint
app.register_blueprint(main_blueprint)
app.register_blueprint(internship_blueprint, url_prefix='/api/internships')

if __name__ == '__main__':
    app.run(debug=True)