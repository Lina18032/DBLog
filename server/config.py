#import json
#import os

#class Config:
    #DATABASE_URIS_PATH = "database_uris.json"
    #DATABASE_URIS = {}  

    #@staticmethod
    #def load_database_uris():
        #if os.path.exists(Config.DATABASE_URIS_PATH):
            #with open(Config.DATABASE_URIS_PATH) as f:
                #return json.load(f)
        #return {}

    #@staticmethod
    #def save_database_uris(data):
        #print(f"Saving DBs: {data}")
        #with open(Config.DATABASE_URIS_PATH, "w") as f:
            #json.dump(data, f, indent=4)

import sqlite3

class Config:
    DB_PATH = "./app/db.sqlite3"  


    @staticmethod
    def load_database_uris():
        conn = sqlite3.connect(Config.DB_PATH)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT name, db_type, host, port, username, password
            FROM databases
        """)
        rows = cursor.fetchall()
        conn.close()

        uris = {}

        for row in rows:
            name, db_type, host, port, username, password = row
            if db_type == 'postgresql':
                uri = f"postgresql://{username}:{password}@{host}:{port}/{name}"
            elif db_type == 'mysql':
                uri = f"mysql+pymysql://{username}:{password}@{host}:{port}/{name}"
            elif db_type == 'sqlserver':
                uri = f"mssql+pyodbc://{username}:{password}@{host},{port}/{name}?driver=ODBC+Driver+17+for+SQL+Server"
            else:
                continue  # Skip unsupported DB types
            uris[name] = uri

        return uris

