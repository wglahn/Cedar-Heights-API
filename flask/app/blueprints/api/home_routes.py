from sqlalchemy import desc
from . import bp as api
from app.blueprints.api.auth_routes import token_auth
from flask import request, make_response, g, abort
from app.models import *
from helpers import require_admin
import os

############
##
##  CATEGORY API ROUTES
##
############


# Get all the Categories

@api.get('/category')
def get_category():
    cats = Category.query.all()   
    cats_dicts = [cat.to_dict() for cat in cats]
    return make_response({"categories":cats_dicts},200)


# create a new category
# {
#     "name":"my cat name"
# }
@api.post('/category')
@token_auth.login_required()
@require_admin
def post_category():
    cat_name = request.get_json().get("name")
    cat = Category(name=cat_name)
    cat.save()
    return make_response(f"category {cat.id} with name {cat.name} created", 200)

# Change my category
# {
#   "name":"new name"
# }
@api.put('/category/<int:id>')
@token_auth.login_required()
@require_admin
def put_category(id):
    cat_name = request.get_json().get("name")
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    cat.name=cat_name
    cat.save()
    return make_response(f"Category {cat.id} has a new name: {cat.name}",200)

# Delete a category
@api.delete('/category/<int:id>')
@token_auth.login_required()
@require_admin
def delete_category(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    cat.delete()
    return make_response(f"Category {id} has been deleted.")


#############
##
##  Home API ROUTES
##
############

# Get all homes
@api.get('/home')
def get_homes():
    homes = Home.query.all()   
    homes_dicts = [home.to_dict() for home in homes]
    return make_response({"homes":homes_dicts},200)

# Get home by its id
@api.get('/home/<int:id>')
def get_home(id):
    home = Home.query.get(id)
    if not home:
        abort(404)
    return make_response(home.to_dict(),200)

# {
#     "id":3,
#     "name":"name",
# }
# Get all homes in a category
@api.get('/home/category/<int:id>')
def get_homes_by_cat(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    all_homes_in_cat = [home.to_dict() for home in cat.homes]
    return make_response({"homes":all_homes_in_cat}, 200)

# Create a new home
# {
#     "vin":"string",
#     "model":"string",
#     "manufacturer":"string",
#     "size":"string",
#     "location":"string",
#     "price":"string",
#     "desc":"string",
#     "year":"int",    
#     "category_id":"int"
# }
@api.post("/home")
@token_auth.login_required()
@require_admin
def post_home():
    home_dict = request.get_json()
    if not all(key in home_dict for key in ('vin','model','manufacturer','size', \
        'location','price','desc','year','category_id')):
        abort(400)
    home = Home()
    home.from_dict(home_dict)
    home.save()
    return make_response(f"Home {home.model} was created with an id {home.id}",200)

@api.put('/home/<int:id>')
@token_auth.login_required()
@require_admin
def put_home(id):
    home_dict = request.get_json()
    home = Home.query.get(id)
    if not home:
        abort(404)
    home.from_dict(home_dict)
    home.save()
    return make_response(f"Home {home.model} with ID {home.id} has been updated", 200)

@api.delete('/home/<int:id>')
@token_auth.login_required()
@require_admin
def delete_home(id):
    home_to_delete = Home.query.get(id)
    if not home_to_delete:
        abort(404)
    home_to_delete.delete()
    return make_response(f"Home with id {id} has been deleted",200)

#############
##
##  Image API ROUTES
##
############

# Get all images
@api.get('/image')
def get_images():
    images = Image.query.all()   
    images_dicts = [image.to_dict() for image in images]
    return make_response({"images":images_dicts},200)

# Get first ordered image associated with a home id
@api.get('/image/<int:id>')
def get_image(id):
    image = Image.query.filter_by(home_id = id, order = 1).first()
    if not image:
        abort(404)
    return make_response(image.to_dict(),200)


# Get all images associated with a home
@api.get('/image/home/<int:id>')
def get_images_by_home(id):
    images = Image.query.filter_by(home_id = id).order_by("order")
    if not images:
        abort(404)
    all_images_of_home = [image.to_dict() for image in images]
    return make_response({"images":all_images_of_home}, 200)

# Create an image
# {
    # 'id':self.id,
    # 'title':self.title,
    # 'order':self.order,
    # 'home_id':self.home_id
# }
@api.post("/image")
@token_auth.login_required()
@require_admin
def post_image():
    image_dict = request.get_json()
    if not all(key in image_dict for key in ('title','order','url','home_id')):
        abort(400)
    image = Image()
    image.from_dict(image_dict)
    image.save()
    return make_response(f"Image {image.title} was created with an id {image.id}",200)

@api.put('/image/<int:id>')
@token_auth.login_required()
@require_admin
def put_image(id):
    image_dict = request.get_json()
    image = Image.query.get(id)
    if not image:
        abort(404)
    image.from_dict(image_dict)
    image.save()
    return make_response(f"Image {image.title} with ID {image.id} has been updated", 200)

@api.delete('/image/<int:id>')
@token_auth.login_required()
@require_admin
def delete_image(id):
    image_to_delete = Image.query.get(id)
    if not image_to_delete:
        abort(404)
    image_to_delete.delete()
    return make_response(f"Image with id {id} has been deleted",200)