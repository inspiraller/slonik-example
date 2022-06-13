# run docker
docker-compose up 

# Testing:
# connect
// connect      containername  language username               database
docker exec -it todos          psql     -U postgres_todos_user -d postgres_todos_db

# Search if table exist
```
SELECT EXISTS (SELECT FROM pg_tables WHERE tablename  = todos);
```

# Create table
```
CREATE TABLE todos(
id SERIAL PRIMARY KEY,
name VARCHAR(500) NOT NULL,
completed BOOLEAN NOT NULL);
```

# view db
\dt

```
List of relations
 Schema | Name  | Type  |        Owner
--------+-------+-------+---------------------
 public | todos | table | postgres_todos_user
(1 row)
```

# example - insert 1 row
INSERT INTO todos (name, completed) VALUES ('example todo1', false);

# view 1 row
SELECT * FROM todos;

# exit
\q

# Force exit?
[ctrl] D 

# docker commands - show containers
docker ps -a
--------------------------------------------
# Create connection via node server
**server.js**
```js
const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres_todos_user',
  host: 'localhost',
  database: 'postgres_todos_db',
  password: 'postgres_todos_pwd',
  port: 5432,
})

pool.query('SELECT * FROM todos ORDER BY id ASC', (error, results) => {
  if (error) {
    throw error
  }
  console.log('example get from postgresql', results.rows)
})
```

------------------------------------------
# Troubleshooting: - syntax error at or near "$1"
- This seems to be caused by interpolation problems.
- Ensure you have not wrapped a pool.connect inside a pool.connect
- Know that the variables interpolated may be processed with a single quote
- Ensure each sql statments end in semi colon;

# Investigation:
- kill/clear the postgres-sql container and volumes
- Consider downgrading or upgrading slonik
- Test the sql commands in docker container as above




