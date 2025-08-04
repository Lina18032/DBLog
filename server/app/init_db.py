import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "db.sqlite3")  

def init_db():
    try:
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()

        with open("schema.sql", "r") as f:
            sql = f.read()
            cur.executescript(sql)
            conn.commit()

        print("SQLite database initialized at:", DB_PATH)

    except Exception as e:
        print(f"Error initializing SQLite DB: {e}")

    finally:
        if conn:
            cur.close()
            conn.close()

if __name__ == "__main__":
    init_db()
