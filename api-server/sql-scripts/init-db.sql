CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE CLIENT (
    client_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_date TIMESTAMP NOT NULL,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE CSV_IMPORT (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    csv_import_date TIMESTAMP NOT NULL,
    type_import INT NOT NULL,
    client_id_fk UUID NOT NULL,
    FOREIGN KEY (client_id_fk) REFERENCES CLIENT(client_id)
);

CREATE TABLE CSV_DATA (
    csv_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    csv_import_id_fk UUID NOT NULL,
    csv_date TIMESTAMP NOT NULL,
    balance REAL NOT NULL,
    equity REAL NOT NULL,
    deposit REAL NOT NULL,
    FOREIGN KEY (csv_import_id_fk) REFERENCES CSV_IMPORT(id)
);
