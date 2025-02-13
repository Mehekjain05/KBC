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
    data = request.get_json()

    # Check if user already exists
    if collection.find_one({"email": data.get('email')}):
        return jsonify({"message": "User already exists"}), 400

    # Create new user entry
    user_details = {
        'user_name': data.get('name'),
        'email': data.get('email'),
        'password': bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
    }

    collection.insert_one(user_details)

    # Store user session
    session['user_name'] = user_details['user_name']
    session['email'] = user_details['email']

    return jsonify({"message": "User Registered", "username": session['user_name']}), 201

@app.route("/login", methods=['POST'])
def Login():
    data = request.get_json()
    username = data.get('name')
    password = data.get('password')

    user = collection.find_one({"user_name": username})

    if user:
        if bcrypt.check_password_hash(user['password'], password):
            session['user_name'] = user['user_name']
            session['email'] = user['email']
            return jsonify({"message": "Login Successful"}), 200
        else:
            return jsonify({"message": "Invalid Credentials"}), 401
    return jsonify({"message": "User does not exist"}), 404 


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
    