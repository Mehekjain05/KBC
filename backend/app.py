from flask import Flask, request, jsonify, session
import os
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()
app.secret_key = os.getenv('secret_key')

@app.route("/register", methods = ['GET', 'POST'])
def Register():
    data:dict = request.get_json()
    session['user_name'] = data.get('name')
    session['email'] = data.get('email')
    return jsonify({"message": "Data Received", "username": session['user_name']}), 200

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
    