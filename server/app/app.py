from flask import Flask, jsonify ,request ,json
from flask_cors import CORS
from config import Config
import psycopg2
from urllib.parse import urlparse
from sqlalchemy import create_engine, text


app = Flask(__name__)
app.config.from_object(Config)
CORS(app)



def paginate_dict(data_dict, page, per_page):
    items = list(data_dict.items())
    total = len(items)
    start = (page - 1) * per_page
    end = start + per_page
    paginated_items = items[start:end]

    return {
        "items": dict(paginated_items),
        "pagination": {
            "total": total,
            "page": page,
            "per_page": per_page,
            "total_pages": (total + per_page - 1) // per_page
        }
    }




@app.route("/check-dbs", methods=["GET"])
def check_databases():
    database_uris = Config.load_database_uris()  # {"DB1": "...", "DB2": "..."}
    page = int(request.args.get("page", 1))
    search_query = request.args.get("search", "").strip().upper()
    per_page = 9
    if search_query:
        database_uris = {
            name: uri for name, uri in database_uris.items()
            if search_query in name.upper()
        }

    items = list(database_uris.items())
    total = len(items)
    start = (page - 1) * per_page
    end = start + per_page
    paginated_dbs = items[start:end]

    results = {}
    test_query = "SELECT 1;"

    for label, uri in paginated_dbs:
        try:
            conn = psycopg2.connect(uri)
            cursor = conn.cursor()
            cursor.execute(test_query)
            data = cursor.fetchone()
            results[label] = f"connected: {data[0]}"
            conn.close()
        except Exception as e:
            results[label] = f"failed: {str(e)}"

    return jsonify({
        "results": results,
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": (total + per_page - 1) // per_page
        }
    })


import sqlalchemy

@app.route("/add-db", methods=["POST"])
def add_database():
    data = request.json
    name = data.get("name", "").upper()
    uri = data.get("uri")

    if not name or not uri:
        return jsonify({"error": "Missing name or uri"}), 400

    dbs = Config.load_database_uris()
    if name in dbs:
        return jsonify({"error": "Database already exists"}), 400

    # ✅ Try connecting to the DB before saving
    try:
        engine = sqlalchemy.create_engine(uri)
        with engine.connect() as conn:
            conn.execute(sqlalchemy.text("SELECT 1"))
    except Exception as e:
        return jsonify({"error": f"Cannot connect to database: {str(e)}"}), 400

    # ✅ Save only if connection succeeded
    dbs[name] = uri
    Config.save_database_uris(dbs)

    return jsonify({"message": "Database added successfully", "name": name}), 200



@app.route("/list-dbs", methods=["GET"])
def list_dbs():
    dbs = Config.load_database_uris()
    return jsonify(dbs)

@app.route("/table-counts", methods=["GET"])
def table_counts():
    dbs = Config.load_database_uris()
    table_counts_result = {}

    for label, uri in dbs.items():
        try:
            conn = psycopg2.connect(uri)
            cursor = conn.cursor()
            cursor.execute("""
                SELECT COUNT(*) 
                FROM information_schema.tables 
                WHERE table_schema = 'public';
            """)
            count = cursor.fetchone()[0]
            table_counts_result[label] = count
            conn.close()
        except Exception as e:
            table_counts_result[label] = f"error: {str(e)}"

    return jsonify(table_counts_result)

@app.route('/get-db-names', methods=['GET'])
def get_db_names():
    try:
        with open('database_uris.json', 'r') as f:
            db_data = json.load(f)
        db_names = list(db_data.keys())
        return jsonify(db_names)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    print("🔍 Checking initial DB connections...")
    for label, uri in Config.DATABASE_URIS.items():
        try:
            conn = psycopg2.connect(uri)
            conn.close()
            print(f"{label} connected.")
        except Exception as e:
            print(f"{label} failed: {e}")

    app.run(debug=True)
