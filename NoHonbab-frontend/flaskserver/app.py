from flask import Flask, request
from flask_restx import Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

@app.route('/')
def index():
    return 'Welcome to Flask server!'



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
