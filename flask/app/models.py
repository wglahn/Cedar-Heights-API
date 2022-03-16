from app import db, login
from flask_login import UserMixin
from datetime import datetime as dt, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150))
    last_name = db.Column(db.String(150))
    email = db.Column(db.String(150), index=True, unique=True)
    password = db.Column(db.String(200))
    created_on = db.Column(db.DateTime, default = dt.utcnow)
    token = db.Column(db.String, index=True, unique=True)
    token_exp = db.Column(db.DateTime)
    is_admin = db.Column(db.Boolean, default=False)

    ##################################################
    ############## Methods for Token auth ############
    ##################################################

    def get_token(self, exp=86400):
        current_time = dt.utcnow()
        #give the user their token if it is not expired
        if self.token and self.token_exp > current_time + timedelta(seconds=60):
            return self.token
        #if the token DNE or token is exp
        self.token = secrets.token_urlsafe(32)
        self.token_exp = current_time + timedelta(seconds=exp)
        self.save()
        return self.token

    def revoke_token(self):
        self.token_exp = dt.utcnow() - timedelta(seconds=61)

    @staticmethod
    def check_token(token):
        u = User.query.filter_by(token=token).first()
        if not u or u.token_exp < dt.utcnow():
            return None
        return u
    #########################################
    ############# End Methods for tokens ####
    #########################################

        #salts and hashes our password to make it hard to steal
    def hash_password(self, original_password):
        return generate_password_hash(original_password)
    
    # compares the user password to the password provided in the login form
    def check_hashed_password(self, login_password):
        return check_password_hash(self.password, login_password)

    def from_dict(self, data):
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = self.hash_password(data['password'])

    def to_dict(self):
        return {
            "user_id": self.id,
            "email": self.email,
            "created_on":self.created_on,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "token":self.token
            }

    # saves the user to the database
    def save(self):
        db.session.add(self) # add the user to the db session
        db.session.commit() #save everything in the session to the database
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()

@login.user_loader
def load_user(id):
    return User.query.get(int(id))
    # SELECT * FROM user WHERE id = ???

class Home(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vin = db.Column(db.String)
    model = db.Column(db.String)
    manufacturer = db.Column(db.String)
    size = db.Column(db.String)
    location = db.Column(db.String)
    price = db.Column(db.String)
    desc = db.Column(db.Text)
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    sold_on = db.Column(db.DateTime)
    category_id = db.Column(db.ForeignKey('category.id'))
    images = db.relationship('Image', cascade='all, delete-orphan', backref="home", lazy="dynamic")

    def __repr__(self):
        return f'<Item: {self.id} | {self.model}>'

    def to_dict(self):
        data={
            'id':self.id,
            'vin':self.vin,
            'model':self.model,
            'manufacturer':self.manufacturer,
            'size':self.size,
            'location':self.location,
            'price':self.price,
            'desc':self.desc,
            'created_on':self.created_on,
            'sold_on':self.sold_on,
            'category_id':self.category_id
        }
        return data

    def from_dict(self, data):
        for field in ["vin","model","manufacturer","size","location","price","desc","sold_on","category_id"]:
            if field in data:
                # the object, the attribute, value
                setattr(self, field, data[field])

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
      

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    homes = db.relationship('Home', cascade='all, delete-orphan', backref="category", lazy="dynamic")

    def __repr__(self):
        return f'<Category: {self.id}|{self.name}>'

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def from_dict(self, data):
        for field in ["name"]:
            if field in data:
                # the object, the attribute, value
                setattr(self, field, data[field])

    def to_dict(self):
        data={
            "id":self.id,
            "name":self.name
        }
        return data

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    order = db.Column(db.Integer)
    url = db.Column(db.String)
    home_id = db.Column(db.ForeignKey('home.id'))

    def __repr__(self):
        return f'<Image: {self.id} | {self.title}>'

    def to_dict(self):
        data={
            'id':self.id,
            'title':self.title,
            'order':self.order,
            'url':self.url,
            'home_id':self.home_id
        }
        return data

    def from_dict(self, data):
        for field in ["title","order","url","home_id"]:
            if field in data:
                # the object, the attribute, value
                setattr(self, field, data[field])

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    birth_date = db.Column(db.DateTime)
    ss_num = db.Column(db.String)
    dl_num = db.Column(db.String)
    phone_num = db.Column(db.String)
    children = db.Column(db.String)
    pets = db.Column(db.String)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zip = db.Column(db.String)
    landlord = db.Column(db.String)
    landlord_phone = db.Column(db.String)
    rental_duration = db.Column(db.String)
    rental_ref = db.Column(db.Text)
    credit_ref = db.Column(db.Text)
    employer = db.Column(db.Text)
    employer_phone = db.Column(db.Text)
    monthly_income = db.Column(db.Float)
    employed_duration = db.Column(db.Text)
    question1 = db.Column(db.Boolean)
    question2 = db.Column(db.Boolean)
    question3 = db.Column(db.Boolean)
    question4 = db.Column(db.Boolean)
    question5 = db.Column(db.Boolean)
    question6 = db.Column(db.Boolean)
    question_desc = db.Column(db.Text)
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    signature = db.Column(db.Text)
    reviewed_on = db.Column(db.DateTime)
    is_approved = db.Column(db.Boolean)
    reason = db.Column(db.Text)

    def __repr__(self):
        return f'<Application: {self.id} | {self.last_name}>'

    def to_dict(self):
        data={
            'id':self.id,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'birth_date':self.birth_date,
            'ss_num':self.ss_num,
            'dl_num':self.dl_num,
            'phone_num':self.phone_num,
            'children':self.children,
            'pets':self.pets,
            'address':self.address,
            'city':self.city,
            'state':self.state,
            'zip':self.zip,
            'landlord':self.landlord,
            'landlord_phone':self.landlord_phone,
            'rental_duration':self.rental_duration,
            'why_leave':self.why_leave,
            'rental_ref':self.rental_ref,
            'employer':self.employer,
            'employer_phone':self.employer_phone,
            'monthly_income':self.monthly_income,
            'employed_duration':self.employed_duration,
            'credit_ref':self.credit_ref,
            'question1':self.question1,
            'question2':self.question2,
            'question3':self.question3,
            'question4':self.question4,
            'question5':self.question5,
            'question6':self.question6,
            'question_desc':self.desc,
            'created_on':self.created_on,
            'signature':self.signature,
            'reviewed_on':self.reviewed_on,
            'is_approved':self.is_approved,
            'reason':self.reason
        }
        return data

    def from_dict(self, data):
        for field in ["first_name","last_name","birth_date","ss_num","dl_num", \
            "phone_num","children","pets","address","city","state","zip", \
            "landlord","landlord_phone","rental_duration","why_leave","rental_ref", \
            "employer","employer_phone","monthly_income","employed_duration", \
            "credit_ref","question1","question2","question3","question4", \
            "question5","question6","question_desc","created_on","signature", \
            "reviewed_on","is_approved","reason"]:
            if field in data:
                # the object, the attribute, value
                setattr(self, field, data[field])

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
