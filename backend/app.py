from flask import Flask

app = Flask(__name__)

@app.route("/home")
def home():
    return {"data" : "Hey buddy let's begin"}



if __name__ == "__main__":
    app.run(debug=True)
    