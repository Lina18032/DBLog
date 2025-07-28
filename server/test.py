from sqlalchemy import create_engine

uri = "mssql+pyodbc://sa:your_password@localhost:1433/your_db?driver=ODBC+Driver+17+for+SQL+Server"
engine = create_engine(uri)

with engine.connect() as conn:
    print(conn.execute("SELECT 1").fetchall())
