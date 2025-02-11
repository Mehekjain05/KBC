from flask import Flask, request, jsonify, session
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app) 
load_dotenv()
app.secret_key = os.getenv('secret_key')
client = MongoClient('mongodb+srv://mehek:9082888529@kbc-app.eoinr.mongodb.net/') 
db = client['user'] 
collection = db['data'] 

user_details = {}
@app.route("/register", methods = ['GET', 'POST'])
def Register():
    data:dict = request.get_json()

    user_details['user_name'] = data.get('name')
    user_details['email'] = data.get('email')
    password = data.get('password')
    user_details['password'] = bcrypt.generate_password_hash(password=password).decode('utf-8')
    collection.insert_one(user_details)
    session = user_details
    return jsonify({"message": "Data Received", "username": session['user_name']}), 200

@app.route("/login", methods = ['GET', 'POST'])
def Login():
    data:dict = request.get_json()
    username = data.get('name')
    password = data.get('password')
    user = collection.find_one({"user_name": username})
    print(user)
    if user:
        original_hased_pass = user['password']
        valid = bcrypt.check_password_hash(original_hased_pass, password)
        if valid:
            return jsonify({"message": "Valid User"}), 200
        else:
            return jsonify({"message": "Invalid Credentials"}), 404
    return jsonify({"message": "User does not exists"}), 404    

@app.route('/get_username', methods=['GET'])
def get_username():
    if 'user_name' in session:
        return jsonify({"username": session['user_name']}), 200
    else:
        return jsonify({"error": "No user found"}), 404
    

@app.route('/logout', methods = ['GET'])
def logout():
    session.clear()
    return jsonify({"message": "User logged out"}), 200    


if __name__ == "__main__":
    app.run(debug=True)
    