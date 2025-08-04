from flask import Flask
from flask_cors import CORS
from config import Config
from dotenv import load_dotenv
from flask_session import Session 
import os
from app.services.login import auth_bp
from flask_mail import Mail
from app.routes.notifs import notification_bp


mail = Mail() 

def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

    mail.init_app(app)
    app.secret_key = os.getenv("SECRET_KEY")
    app.config.from_object(Config)
    CORS(app, supports_credentials=True)

    from app.routes.db_routes import db_bp
    app.register_blueprint(db_bp)
    app.register_blueprint(auth_bp)
    from app.routes.notifs import notification_bp
    app.register_blueprint(notification_bp)

    return app
