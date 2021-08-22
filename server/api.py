import face_recognition
from numpy import ndarray
from cryptography.fernet import Fernet

def string_to_enc(enc: str) -> ndarray:
    enc = enc.replace("[", "").replace("]", "")
    encoding = map(float, enc.split())
    encoding = list(encoding)
    return ndarray(encoding)

def compare_enc(enc1: ndarray, enc2: ndarray) -> bool:
    result = face_recognition.compare_faces([enc1], enc2)
    return result

def encrypt_enc(enc: ndarray) -> str:
    f = open('private_key.txt', 'r')
    private_key = f.read()
    f.close()
    fernet = Fernet(private_key)
    str_enc = str(enc)
    encr_enc = fernet.encrypt(str_enc.encode())
    return encr_enc

def decrypt_enc(encr_enc: str) -> ndarray:
    f = open('private_key.txt', 'r')
    private_key = f.read()
    f.close()
    fernet = Fernet(private_key)
    decr_enc = fernet.decrypt(encr_enc.decode())
    decr_enc = string_to_enc(decr_enc)
    return decr_enc

def create_enc(file):
    image = face_recognition.load_image_file(file)
    enc = face_recognition.face_encodings(image)
    return enc

def get_encr_enc(file) -> str:
    enc = create_enc(file)
    encr_enc = encrypt_enc(enc)
    return encr_enc

def authenticate_user(encr_enc: str, encr_enc_db: ndarray) -> bool:
    str_decr_enc = decrypt_enc(encr_enc)
    str_decr_enc_db = decrypt_enc(encr_enc_db)
    decr_enc = string_to_enc(str_decr_enc)
    decr_enc_db = string_to_enc(str_decr_enc_db)
    return compare_enc(decr_enc, decr_enc_db)