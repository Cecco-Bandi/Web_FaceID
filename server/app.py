from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return("Hello")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')