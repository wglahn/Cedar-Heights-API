from flask import Blueprint

bp = Blueprint('api',__name__, url_prefix='/api')

from .import home_routes, auth_routes, application_routes