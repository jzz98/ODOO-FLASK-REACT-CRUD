from flask import Flask
from flask_cors import CORS
# apis
from apis.Auth import auth
from apis.Crud import crud_api
    
app = Flask(__name__)
CORS = CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

#register routes
app.register_blueprint(auth)
app.register_blueprint(crud_api)

if __name__ == "__main__":
    app.run(debug=True)