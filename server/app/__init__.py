from flask import Flask
from flask_cors import CORS
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    # Register blueprints
    from app.routes.db_routes import db_bp
    app.register_blueprint(db_bp)

    return app
