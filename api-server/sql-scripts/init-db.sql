CREATE TABLE  "USER" (
    user_id SERIAL PRIMARY KEY,
    date_time TIMESTAMP NOT NULL,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE  CSV_IMPORT (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    user_id_fk INT NOT NULL,
    csv_id INT NOT NULL,
    type_import INT NOT NULL,
    FOREIGN KEY (user_id_fk) REFERENCES "USER"(user_id)
);

CREATE TABLE  CSV_DATA (
    csv_id SERIAL PRIMARY KEY,
    csv_import_id_fk INT NOT NULL,
    data TIMESTAMP NOT NULL,
    balance REAL NOT NULL,
    equity REAL NOT NULL,
    deposit REAL NOT NULL,
    FOREIGN KEY (csv_import_id_fk) REFERENCES CSV_IMPORT(id)
);
