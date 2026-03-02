from flask import Blueprint, request, jsonify
import requests
from os import getenv
from service.OdooRpc import OdooRpc

auth = Blueprint("authApi", __name__)
odoo_rpc = OdooRpc()

ODOO_DB = getenv("ODOO_DB")
ODOO_URL = getenv("ODOO_URL")
ODOO_ADMIN_UID = getenv("ODOO_ADMIN_UID")
ODOO_ADMIN_PASSWORD = getenv("ODOO_ADMIN_PASSWORD")


@auth.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        odoo_session = requests.Session()

        payload = {
            "jsonrpc": "2.0",
            "params": {
                "db": ODOO_DB,
                "login": email,
                "password": password
            }
        }

        response = odoo_session.post(
            f"{ODOO_URL}/web/session/authenticate",
            json=payload
        )

        result = response.json()

        if not result.get("result"):
            return jsonify({"status": 401,"success": False, "error": "Invalid credentials"}), 401

        return jsonify({"status": 200, "success": True,"message": "Wellcome!!"}), 200
    except Exception as exp:
        print(exp)
        return jsonify({"status": 500, "success": False, "error": "Something went wrong, try later!!"}), 500


@auth.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        email = data["email"]
        username = data["username"]
        password = data["password"]

        # RESPETEN EL ORDEN DEL PAYLOAD
        payload = {
            "jsonrpc": "2.0",
            "method": "call",
            "params": {
                "service": "object",
                "method": "execute_kw",
                "args": [
                    ODOO_DB,
                    ODOO_ADMIN_UID,
                    ODOO_ADMIN_PASSWORD,
                    "res.users",
                    "create",
                    [{
                        "name": username,
                        "email": email,
                        "login": email, # FALTABA ESTE CAMPO
                        "password": password  # ODOO HASHEA EL PASSWORD EN AUTOMATICO
                    }]
                ]
            }
        }

        # USAR EL ODOO RPC
        result = odoo_rpc.call(payload=payload)

        if "error" in result:
            error_data = result["error"].get("data", {})
            error_message = error_data.get("message", "") 
            # estamos resolviendo un error
            print(error_data, "messaggeeee", error_message)
               # Usuario / email duplicado
            if ("same login" in error_message
                or "login" in error_message
                or "res_users_login_key" in str(result["error"])):
                
                return jsonify({
                    "success": False,
                    "error": "Ya existe un usuario registrado con este correo electrónico"
                }), 400

            return jsonify({
                "success": False,
                "error": "No se pudo crear el usuario"
            }), 400

        return jsonify({"success": True, "status": 201, "message": "Wellcome!!"}), 200
    
    except Exception as exp:
        print(exp)
        return jsonify({"status": 500, "error": "Something went wrong, try later!!"}), 500

