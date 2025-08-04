import sqlite3

conn = sqlite3.connect("db.sqlite3") 
cursor = conn.cursor()

cursor.execute("""
    INSERT INTO databases (db_type, name, host, port, username, password, status, disconnected_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
""", (
    'postgresql', 'pharma', 'localhost', 5432, 'postgres', 'lina', 'connected', None
))

conn.commit()
conn.close()
print("✅ Database inserted.")
