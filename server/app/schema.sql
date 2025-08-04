-- Admin user table
CREATE TABLE admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Registered databases
CREATE TABLE databases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    db_type TEXT NOT NULL, -- postgresql, mysql, sqlserver
    name TEXT NOT NULL,
    host TEXT NOT NULL,
    port INTEGER NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    status TEXT NOT NULL, -- connected/disconnected
    disconnected_at TEXT
);

-- Table details
CREATE TABLE db_tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    database_id INTEGER NOT NULL,
    table_name TEXT NOT NULL,
    rows_count INTEGER,
    columns_count INTEGER,
    indexed_columns TEXT,
    last_record TEXT,
    FOREIGN KEY(database_id) REFERENCES databases(id)
);

-- Backups
CREATE TABLE backups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    database_id INTEGER NOT NULL,
    type TEXT NOT NULL, -- full, incremental
    start_time TEXT,
    end_time TEXT,
    status TEXT,
    size TEXT,
    path TEXT,
    triggered_by TEXT, -- manual / scheduled
    FOREIGN KEY(database_id) REFERENCES databases(id)
);

-- Replication info
CREATE TABLE replications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    database_id INTEGER NOT NULL,
    mode TEXT, -- sync, async, semi-sync
    status TEXT, -- idle, running, error
    lag_seconds INTEGER,
    primary_node TEXT,
    replica_node TEXT,
    last_sync_time TEXT,
    FOREIGN KEY(database_id) REFERENCES databases(id)
);

-- Jobs
CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    database_id INTEGER NOT NULL,
    name TEXT,
    type TEXT, -- backup, cleanup, maintenance
    status TEXT, -- success, fail
    last_run TEXT,
    next_run TEXT,
    FOREIGN KEY(database_id) REFERENCES databases(id)
);

-- Logs
CREATE TABLE logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    database_id INTEGER NOT NULL,
    timestamp TEXT,
    type TEXT, -- success / error
    message TEXT,
    FOREIGN KEY(database_id) REFERENCES databases(id)
);
