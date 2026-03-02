import requests
from os import getenv

class OdooRpc():
    def __init__(self):
        self.ODOO_URL = getenv("ODOO_URL")
        self.ODOO_DB = getenv("ODOO_DB")
        
    def call(self, payload):
        r = requests.post(
            f"{self.ODOO_URL}/jsonrpc",
            headers={
                "Content-Type": "application/json",
                "X-Odoo-Database": self.ODOO_DB,  
            },
            json=payload,
            timeout=10
        )

        return r.json()