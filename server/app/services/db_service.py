from flask import request, jsonify
from config import Config
import psycopg2 , pyodbc  , sqlite3
from sqlalchemy import create_engine, text
from app.utils.helpers import paginate_dict
import json
from sqlalchemy.engine.url import make_url
from urllib.parse import urlparse
from sqlalchemy.engine import URL
import urllib



def add_database_uri():
    data = request.json
    name = data.get("name", "").upper()
    uri = data.get("uri")

    if not name or not uri:
        return jsonify({"error": "Missing name or uri"}), 400

    dbs = Config.load_database_uris()
    if name in dbs:
        return jsonify({"error": "Database already exists"}), 400

    try:
        url = make_url(uri)
        drivername = url.drivername

        if drivername == "mysql":
            # Ensure mysql uses pymysql
            url = url.set(drivername="mysql+pymysql")
            uri = str(url)

        elif drivername in ["mssql", "sqlserver", "mssql+pyodbc"]:
            # Normalize and enforce driver
            query = dict(url.query)
            query["driver"] = "ODBC Driver 17 for SQL Server"
            query["Encrypt"] = "yes"
            query["TrustServerCertificate"] = "yes"
            query["Connection Timeout"] = "30"
            uri = str(URL.create(
                drivername="mssql+pyodbc",
                username=url.username,
                password=url.password,
                host=url.host,
                port=url.port,
                database=url.database,
                query=query
            ))

        # Try connection
        engine = create_engine(uri)
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))

    except Exception as e:
        return jsonify({"error": f"Cannot connect to database: {str(e)}"}), 400

    # Save only if test was successful
    dbs[name] = uri
    Config.save_database_uris(dbs)
    return jsonify({"message": "Database added successfully", "name": name}), 200




def parse_sqlalchemy_uri(uri):
    parsed = urlparse(uri)

    return {
        "user": parsed.username,
        "password": parsed.password,
        "host": parsed.hostname,
        "port": parsed.port,
        "database": parsed.path.lstrip("/"),
    }

def check_databases_status():
    database_uris = Config.load_database_uris()
    page = int(request.args.get("page", 1))
    search_query = request.args.get("search", "").strip().upper()
    per_page = 6

    if search_query:
        database_uris = {
            name: uri for name, uri in database_uris.items()
            if search_query in name.upper()
        }

    paginated = paginate_dict(database_uris, page, per_page)

    results = {}
    for label, uri in paginated["items"].items():
        try:
            url = make_url(uri)
            driver = url.drivername.split('+')[0]

            if driver == "postgresql":
                conn = psycopg2.connect(uri)
                cursor = conn.cursor()
                cursor.execute("SELECT 1;")
                data = cursor.fetchone()[0]
                conn.close()

            elif driver == "mysql":
                import pymysql
                conn = pymysql.connect(
                    host=url.host,
                    user=url.username,
                    password=url.password,
                    database=url.database,
                    port=url.port or 3306
                )
                cursor = conn.cursor()
                cursor.execute("SELECT 1;")
                data = cursor.fetchone()[0]
                conn.close()

            elif driver == "sqlite":
                path = uri.replace("sqlite:///", "")
                conn = sqlite3.connect(path)
                cursor = conn.cursor()
                cursor.execute("SELECT 1;")
                data = cursor.fetchone()[0]
                conn.close()
                
            elif driver in ["mssql", "sqlserver"]:
                conn = pyodbc.connect(uri)
                cursor = conn.cursor()
                cursor.execute("SELECT 1;")
                data = cursor.fetchone()[0]
                conn.close()

            else:
                raise Exception(f"Unsupported DBMS: {driver}")

            results[label] = "connected:"

        except Exception as e:
            results[label] = "failed"

    return jsonify({
        "results": results,
        "pagination": paginated["pagination"]
    })
def list_database_uris():
    return jsonify(Config.load_database_uris())

def get_table_counts():
    dbs = Config.load_database_uris()
    result = {}

    for label, uri in dbs.items():
        try:
            scheme = uri.split(":")[0]

            if scheme == "postgresql":
                conn = psycopg2.connect(uri)
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT COUNT(*) 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public';
                """)
                count = cursor.fetchone()[0]
                conn.close()

            elif scheme == "mysql":
                import pymysql
                conn = pymysql.connect(
                    host=uri.split("@")[1].split("/")[0].split(":")[0],
                    user=uri.split("//")[1].split(":")[0],
                    password=uri.split(":")[2].split("@")[0],
                    database=uri.split("/")[-1],
                    port=int(uri.split(":")[3].split("/")[0])
                )
                cursor = conn.cursor()
                cursor.execute("SHOW TABLES;")
                tables = cursor.fetchall()
                count = len(tables)
                conn.close()
            elif scheme in ["mssql", "sqlserver"]:
                conn = pyodbc.connect(uri)
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT COUNT(*) 
                    FROM INFORMATION_SCHEMA.TABLES 
                    WHERE TABLE_TYPE = 'BASE TABLE';
                """)
                count = cursor.fetchone()[0]
                conn.close()


            elif scheme == "sqlite":
                path = uri.replace("sqlite:///", "")
                conn = sqlite3.connect(path)
                cursor = conn.cursor()
                cursor.execute("SELECT COUNT(*) FROM sqlite_master WHERE type='table';")
                count = cursor.fetchone()[0]
                conn.close()

            else:
                raise Exception(f"Unsupported DBMS")

            result[label] = count

        except Exception as e:
            result[label] = "/"

    return jsonify(result)

def get_db_names_list():
    try:
        with open(Config.DATABASE_URIS_PATH, 'r') as f:
            db_data = json.load(f)
        return jsonify(list(db_data.keys()))
    except Exception as e:
        return jsonify({'error': str(e)}), 500


"""def check_databases_status():
    database_uris = Config.load_database_uris()
    page = int(request.args.get("page", 1))
    search_query = request.args.get("search", "").strip().upper()
    per_page = 6

    if search_query:
        database_uris = {
            name: uri for name, uri in database_uris.items()
            if search_query in name.upper()
        }

    paginated = paginate_dict(database_uris, page, per_page)

    results = {}
    test_query = "SELECT 1;"
    for label, uri in paginated["items"].items():
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
        "pagination": paginated["pagination"]
    })"""
    
    
    

'''def get_table_counts():
    dbs = Config.load_database_uris()
    result = {}
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
            result[label] = count
            conn.close()
        except Exception as e:
            result[label] = f"error: {str(e)}"
    return jsonify(result)
'''
