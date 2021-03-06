import os

from numpy import empty, ndarray

from generate_key import generate_key
from flask import Flask, request, Response, redirect, jsonify
from flask_cors import CORS, cross_origin
from flask_mongoengine import MongoEngine
import base64
import json
from urllib.request import urlopen

from PIL import Image

import api

from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp'
}
cors = CORS(app)

db = MongoEngine()
db.init_app(app)

class Users(db.DynamicDocument):
    first_name = db.StringField(max_length=60, required=True)
    last_name = db.StringField(max_length=60, required=True)
    email = db.EmailField(required=True)
    password = db.StringField(required=True)
    face_reco_encoding = db.BinaryField()
    image = db.DynamicField()

@app.route('/debug-sentry')
def trigger_error():
    division_by_zero = 1 / 0

# Register user
@app.route('/register', methods=['POST'])
def register():
    body = request.form.to_dict()
    if body["regFrame"] is not None:
        body = request.form.to_dict()
        if len(Users.objects(email = body["email"])) > 0:
            return Response({"user already in database"})
        else:
            new_user = Users()
            new_user.first_name = body["first_name"]
            new_user.last_name = body["last_name"]
            new_user.email = body["email"]
            pwd = generate_password_hash(body["password"])
            data = urlopen(body["regFrame"])
            new_user.image = body["regFrame"]            
            face_reco_enc = api.create_enc(data)
            if type(face_reco_enc) is str:
                return not_found()
            elif type(face_reco_enc) is ndarray:
                face_reco_enc = api.encrypt_enc(face_reco_enc)
                new_user.face_reco_encoding = face_reco_enc
                new_user.password = pwd
                new_user.save()
                return Response(json.dumps({"first_name": new_user.first_name, "last_name": new_user.last_name, "email": new_user.email, "image": new_user.image}), mimetype="application/json", status=200)
    else:
        return not_found()

@app.route('/login', methods=['POST'])
def login_user():
    body = request.form.to_dict()
    if len(Users.objects(email=body["email"])) > 0:
        try:
            data = urlopen(body["loginFrame"])  
            face_reco_enc = api.create_enc(data)
            if type(face_reco_enc) is str:
                return not_found()
            elif type(face_reco_enc) is ndarray:        
                for user in Users.objects(email=body["email"]):
                    face_reco_enc_db = api.decrypt_enc(user.face_reco_encoding)
                    respBool = api.face_recognition.compare_faces([face_reco_enc], face_reco_enc_db)[0]
                    if bool(respBool) :
                        user_logged = Users.objects(email=body["email"]).only("first_name").only("last_name").only("email").only("image")
                        return Response(user_logged.to_json(), mimetype="application/json", status=200)
                    else:
                        return not_found()
        except:
            for user in Users.objects(email=body["email"]):
                respBool = check_password_hash(user.password, body["password"])
                if respBool:
                    user_logged = Users.objects(email=body["email"]).only("first_name").only("last_name").only("email").only("image")
                    return Response(user_logged.to_json(), mimetype="application/json", status=200)
                else:
                    return not_found()
    else: 
        return not_found()

@app.route('/delete', methods=['DELETE'])
def delete_users():
    body = request.form.to_dict()
    users_to_del = Users.objects(email=body["email"])
    len_users_del = len(users_to_del)
    users_to_del.delete()
    return Response({"Deleted {} user(s)".format(len_users_del)}, mimetype="application/json", status=200)

@app.route('/delete_all', methods=['DELETE'])
def delete_all_users():
    users_to_del = Users.objects()
    len_users_del = len(users_to_del)
    users_to_del.delete()
    return Response({"Deleted {} user(s)".format(len_users_del)}, mimetype="application/json", status=200)

@app.route('/check_email')
def email_exists():
    body = request.form.to_dict()
    users = Users.objects(body["email"])
    if len(users) > 0:
        return Response({"An user with email {} already exists"}, status=205)
    else:
        return Response({"Email is valid"}, status=200)

@app.route('/list')
def list_users():
    users = Users.objects().to_json()
    return Response(users, mimetype="application/json", status=200)

@app.route('/info')
def server_info():
    return Response({os.environ['MONGODB_USERNAME'], os.environ['MONGODB_PASSWORD']}, mimetype="application/json", status=200)

@app.route('/generate_key')
def generate_priv_key():
    generate_key()
    return Response({"Key Generated"}, mimetype="application/json", status=200)

@app.errorhandler(404)
def not_found():
    return Response({"NOT FOUND"}, mimetype="application/json", status=404)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')