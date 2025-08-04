from flask import Blueprint, request, session, jsonify
import sqlite3
import os

auth_bp = Blueprint("auth", __name__)

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../db.sqlite3")

def get_db_connection():
    return sqlite3.connect(DB_PATH)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM admin WHERE username = ?", (username,))
    row = cursor.fetchone()
    conn.close()

    if row and row[0] == password:
        session["logged_in"] = True
        session["username"] = username
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@auth_bp.route('/change-password', methods=['POST'])
def change_password():
    if not session.get("logged_in"):
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    old_password = data.get("old_password")
    new_password = data.get("new_password")
    confirm_password = data.get("confirm_password")

    if not all([old_password, new_password, confirm_password]):
        return jsonify({"error": "All password fields are required"}), 400
    if new_password != confirm_password:
        return jsonify({"error": "New passwords do not match"}), 400

    username = session.get("username")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM admin WHERE username = ?", (username,))
    row = cursor.fetchone()

    if not row or row[0] != old_password:
        conn.close()
        return jsonify({"error": "Old password is incorrect"}), 403

    cursor.execute("UPDATE admin SET password = ? WHERE username = ?", (new_password, username))
    conn.commit()
    conn.close()

    return jsonify({"message": "Password updated successfully"}), 200

@auth_bp.route('/is_logged_in', methods=['GET'])
def is_logged_in():
    return jsonify({"logged_in": session.get("logged_in", False)}), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200

@auth_bp.route('/check-auth')
def check_auth():
    if session.get("logged_in"):
        return jsonify({"authenticated": True}), 200
    return jsonify({"authenticated": False}), 401
