import face_recognition
from numpy import ndarray
from cryptography.fernet import Fernet
import numpy

def load_key():
    return open("secret.key", "rb").read()

def string_to_enc(enc: str) -> ndarray:
    enc = enc.replace("[", "").replace("]", "")
    encoding = map(float, enc.split())
    encoding = list(encoding)
    return numpy.array(encoding)

def compare_enc(enc1: ndarray, enc2: ndarray) -> bool:
    result = face_recognition.compare_faces([enc1], enc2)
    return result

def encrypt_enc(enc: ndarray) -> str:
    key = load_key()
    fernet = Fernet(key)
    str_enc = numpy.array2string(enc).encode()
    encr_enc = fernet.encrypt(str_enc)
    return encr_enc

def decrypt_enc(encr_enc: bytes) -> ndarray:
    key = load_key()
    fernet = Fernet(key)
    decr_enc = fernet.decrypt(encr_enc)
    decr_enc = decr_enc.decode()
    return decr_enc

def create_enc(file):
    image = face_recognition.load_image_file(file)
    enc = face_recognition.face_encodings(image)
    return numpy.array(enc)

def get_encr_enc(file) -> str:
    enc = create_enc(file)
    encr_enc = encrypt_enc(enc)
    return encr_enc

def authenticate_user(enc: ndarray, encr_enc_db: bytes) -> bool:
    decr_enc_db = decrypt_enc(encr_enc_db)
    decr_enc_db =  numpy.reshape(string_to_enc(decr_enc_db), (1, 128))
    return compare_enc(enc, decr_enc_db)