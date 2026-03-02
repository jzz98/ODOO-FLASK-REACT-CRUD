from flask import Blueprint, request, jsonify
import requests
from os import getenv
from service.OdooRpc import OdooRpc

crud_api = Blueprint("crud_api", __name__)
odoo_rpc = OdooRpc()

ODOO_DB = getenv("ODOO_DB")
ODOO_URL = getenv("ODOO_URL")
ODOO_ADMIN_UID = getenv("ODOO_ADMIN_UID")
ODOO_ADMIN_PASSWORD = getenv("ODOO_ADMIN_PASSWORD")


@crud_api.route("/api/users", methods=["GET", "POST"])
def users():
    try:
        # SI EL METODO ES POST (REUTILIZAREMOS ESTA MISMA FUNCION)
        if request.method == "POST":
            # COPIAREMOS TODO LO QUE HICIMOS AHORA Y LE DAREMOS UN TAB
            data = request.get_json()

            # COPIAREMOS Y PEGAREMOS EL REGISTER, YA QUE PRACTICAMENTE ES LO MISMO
            # ESTA PARTE ES PARA AGREGAR USUARIOS
            # CAMBIAREMOS SOLO ALGUNAS COSAS CLAVES
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
                            "login": email,  # FALTABA ESTE CAMPO
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
                        "message": "Ya existe un usuario registrado con este correo electrónico"
                    }), 400

                return jsonify({
                    "success": False,
                    "message": "No se pudo crear el usuario"
                }), 400

            return jsonify({"success": 201, "message": ""})

        # SI NO ES POST, ES GET
        else:
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
                        "search_read",
                        [[]],  # sin filtros
                        {
                            "fields": [
                                "id",
                                "name",
                                "email",
                            ]
                        }
                    ]
                }
            }

            result = odoo_rpc.call(payload=payload)

            if "error" in result:
                return jsonify({"success": False,"status": 500, "error": "Something went wrong, try later!!"}), 500

            print(result)
            return jsonify({"success": True, "status": 200, "data": result}), 200
            # FUNCIONO CORRECTAMENTE
            
    except Exception as exp:
        print(exp)
        return jsonify({"success": False, "status": 500, "error": "Something went wrong, try later!!"}), 500


@crud_api.route('/api/delete-users/<int:id_user>', methods=["DELETE"])
def delete_users(id_user):
    try:
        # verificamos que existe el usuario
        payload_search = {
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
                    "search",
                    [[
                        ["id", "=", id_user],
                    ]]
                ]
            }
        }

        search_response = odoo_rpc.call(payload_search)

        product_ids = search_response.get("result", [])
        if not product_ids:
            return jsonify({"status": 500, "error": "Usuario no encontrado!!"}), 500

        payload_unlink = {
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
                    "unlink",  # <- metodo para eliminar
                    [
                        product_ids
                    ]
                ]
            }
        }
        # no se estaba ejecutando el payload XD
        result = odoo_rpc.call(payload=payload_unlink)
        if not result:
            return jsonify({"status": 500, "error": "Something went wrong, try later!!"}), 500

        return jsonify({"success": True, "status": 201, "message": "Usuario eliminado corrctamente"})

    except Exception as exp:
        print(exp)
        return jsonify({"status": 500, "error": "Something went wrong, try later!!"}), 500


@crud_api.route("/api/update-users/<int:id_user>", methods=["PUT"])
def update_users(id_user):
    try:
        data = request.get_json()
        print(data)
        
        fields_to_update = {
            "name": data["username"],
            "email": data["email"],
            "password": data["password"]
        }
        payload_write = {
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
                    "write",
                    [
                        id_user,
                        fields_to_update
                    ]
                ]
            }
        }
        
        write_response = odoo_rpc.call(payload_write)

        if not write_response:
            return jsonify({"status": 500, "error": "Something went wrong, try later!!"}), 500

        return jsonify({"success": True, "status": 201, "message": "Usuario actualizado correctamente"})

        # FUNCIONA CORRECTAMENTE !!!!
        # COMENZAREMOS CON LA INTEGRACION CON EL FRONTEND
    except Exception as exp:
        print(exp)
        raise Exception(exp)
