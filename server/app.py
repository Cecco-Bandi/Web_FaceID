from flask import Flask
import face_recognition

image = face_recognition.load_image_file("biden.jpeg")
face_landmarks_list = face_recognition.face_landmarks(image)

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return(str(face_landmarks_list))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')