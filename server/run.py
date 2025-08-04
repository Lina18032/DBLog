from app import create_app

app = create_app()

if __name__ == "__main__":
    from config import Config
    import psycopg2

    print("🔍 Checking initial DB connections...")
    for label, uri in Config.load_database_uris().items():
        try:
            conn = psycopg2.connect(uri)
            conn.close()
            print(f"{label} connected.")
        except Exception as e:
            print(f"{label} failed: {e}")
    app.run(host='0.0.0.0', port=5000)
