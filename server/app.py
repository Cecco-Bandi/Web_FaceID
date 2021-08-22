import os
from flask import Flask, jsonify, request, Response

from flask_mongoengine import MongoEngine

import api

from werkzeug.security import generate_password_hash, check_password_hash

image = api.face_recognition.load_image_file("biden.jpeg")
face_landmarks_list = api.face_recognition.face_landmarks(image)

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp'
}

db = MongoEngine()
db.init_app(app)

class Users(db.DynamicDocument):
    first_name = db.StringField(max_length=60, required=True)
    last_name = db.StringField(max_length=60, required=True)
    email = db.EmailField(required=True)
    password = db.StringField(required=True)
    face_reco_encoding = db.StringField()

# Demo route
@app.route('/demo')
def index():
    Users.objects().delete()
    biden_encoding = api.face_recognition.face_encodings(image)[0]
    biden_encoding = api.encrypt_enc(biden_encoding)
    Users(first_name="Dummy", 
        last_name="Dummy", 
        email="dummy@dummy.com", 
        password="dummy",
        face_reco_encoding=biden_encoding).save()
    Users(first_name="Francesco", 
        last_name="Carrabino", 
        email="francesco.carrabino@gmail.com", 
        password="frank",
        role="idiot").save()
    Users(first_name="Andrea", 
        last_name="Apicella", 
        email="andrea.apicella221@gmail.com", 
        password="andrew").save()

    users = Users.objects().to_json()
    return Response(users, mimetype="application/json", status=200)

# Register user
@app.route('/register', methods=['POST'])
def register():
    body = request.get_json()
    new_user = Users()
    new_user.first_name = body.get("first_name")
    new_user.last_name = body.get("last_name")
    new_user.email = body.get("email")
    pwd = body.get("password")
    pwd = generate_password_hash(pwd)
    new_user.face_reco_encoding = api.get_encr_enc(body.get("face_reco_encoding"))
    new_user.password = pwd
    new_user.save()

    return Response(new_user, mimetype="application/json", status=200)

@app.route('/login')
def login_user():
    body = request.get_json()
    log_user = Users.objects(email=body.get("email"))
    encr_enc = log_user.face_reco_encoding
    
    return

@app.errorhandler(404)
def not_found(erro=None):
    message = {
        'status': 404,
        'message': 'Not found' + request.url
    }
    resp = jsonify(message)

    resp.status_code = 404

    return 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')