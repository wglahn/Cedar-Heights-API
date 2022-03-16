from . import bp as api
from app.models import User
from flask import make_response, g, abort, request
from helpers import require_admin
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

@basic_auth.verify_password
def verify_password(email, password):
    #check if the user exists
    u = User.query.filter_by(email=email).first()
    if u is None:
        return False
    g.current_user = u
    return u.check_hashed_password(password)

@token_auth.verify_token
def verify_token(token):
    u = User.check_token(token) if token else None
    g.current_user = u
    return g.current_user or None

@api.get('/token')
@basic_auth.login_required()
def get_token():
    user = g.current_user
    token = user.get_token()
    return make_response({"token":token}, 200)

@api.get('/login')
@basic_auth.login_required()
def get_login():
    user = g.current_user
    token = user.get_token()
    return make_response({"token":token, **user.to_dict()}, 200)

# @api.post('/user')
# def post_user():
#     '''
#         No Auth
#         creates a new user.
#         expected payload:
#         {
#             "email" : STRING,
#             "first_name" : STRING,
#             "last_name" : STRING
#             "password" : STRING,
            
#         }
#     '''
#     data = request.get_json()
#     if User.query.filter_by(email=data.get('email')).first():
#         abort(422)
#     new_user = User()
#     new_user.from_dict(data)
#     new_user.save()
#     return make_response("success",200)

# @api.put('/admin/<int:id>')
# @token_auth.login_required()
# @require_admin
# def make_admin(id):
#     # Check the user id exists
#     u=User.query.get(id)
#     if not u:
#         abort(404)
#     # Make admin
#     u.is_admin=True
#     u.save()
#     return make_response(f'{u.first_name} {u.last_name} is now an Admin', 200)