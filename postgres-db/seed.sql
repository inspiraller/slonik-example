CREATE TABLE IF NOT EXISTS ${PG_TABLE}(
id SERIAL PRIMARY KEY,
name VARCHAR(500) NOT NULL,
completed BOOLEAN NOT NULL);

-- try: 
-- https://sherryhsu.medium.com/how-to-import-csv-into-docker-postgresql-database-22d56e2a1117
-- COPY ${PG_TABLE} FROM 'todos.init.csv' DELIMITER ',' CSV HEADER;
-- https://stackoverflow.com/questions/46849539/how-can-i-set-path-to-load-data-from-csv-file-into-postgresql-database-in-docker
-- via docker-compose mount

-- COPY ${PG_TABLE} FROM 'todos.init.csv' DELIMITER ',' CSV HEADER;
-- copy backend_data (t, sth1, sth2) FROM '/var/lib/postgresql/data/pgdata/todo.init.csv' CSV HEADER

-- COPY ${PG_TABLE} FROM '/var/lib/postgresql/data/pgdata/todos.init.csv' WITH (FORMAT csv);

-- COPY ${PG_TABLE} FROM './atodos.init.csv' WITH (FORMAT csv);

COPY ${PG_TABLE} FROM '/data/todos.init.csv' DELIMITER ',' CSV HEADER;
