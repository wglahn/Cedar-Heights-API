# Intializing things
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
import os

# from flask_moment import Moment

# init my Login Manager
login = LoginManager()
# Do inits for database stuff
db = SQLAlchemy()
migrate = Migrate()
# moment = Moment()


if os.environ.get('FLASK_ENV') == 'development':
    cors= CORS()

def create_app(config_class=Config):
    #init the app
    app = Flask(__name__)

    #link our config to our app
    app.config.from_object(config_class)

    # register plugins
    # login.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    if os.environ.get('FLASK_ENV') == 'development':
        cors.init_app(app)

    from .blueprints.api import bp as api_bp
    app.register_blueprint(api_bp)
    
    return app