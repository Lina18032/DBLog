from flask import Blueprint, request, jsonify
from app.services.db_service import (
    check_databases_status,
    add_database_uri,
    list_database_uris,
    get_table_counts,
    get_db_names_list
)

db_bp = Blueprint('db_bp', __name__)

@db_bp.route("/check-dbs", methods=["GET"])
def check_dbs():
    return check_databases_status()

@db_bp.route("/add-db", methods=["POST"])
def add_db():
    return add_database_uri()

@db_bp.route("/list-dbs", methods=["GET"])
def list_dbs():
    return list_database_uris()

@db_bp.route("/table-counts", methods=["GET"])
def table_counts():
    return get_table_counts()

@db_bp.route('/get-db-names', methods=['GET'])
def get_db_names():
    return get_db_names_list()
