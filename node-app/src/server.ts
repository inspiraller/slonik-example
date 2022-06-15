import dotEnv from "dotenv";
import { sql, createPool } from "slonik";

dotEnv.config();

const { env } = process;

const PG_DB = env.PG_DB as string;
const PG_USER = env.PG_USER as string;
const PG_PWD = env.PG_PWD as string;
const PG_TABLE = env.PG_TABLE as string;

console.log("env", { PG_TABLE });
const init = () => {
  // postgresql://[user[:password]@][host[:port]][/database name][?name=value[&...]]
  console.log("CREATE POOL");
  const pool = createPool(
    `postgresql://${PG_USER}:${PG_PWD}@localhost:5432/${PG_DB}`
  );

  pool.connect(async (connection) => {
    try {
      const result = await connection.query(sql`SELECT EXISTS (SELECT FROM pg_tables WHERE tablename  = ${PG_TABLE});`);
      const isExist = result.rows[0].exists;
      console.log('SELECT EXISTS =', {isExist})

      // WORKS
      // const query2 = sql`CREATE TABLE todos(id SERIAL PRIMARY KEY, name VARCHAR(500) NOT NULL, completed BOOLEAN NOT NULL);`;
  
      // DOES NOT WORK 
      // const query2 = sql`CREATE TABLE ${PG_TABLE}(id SERIAL PRIMARY KEY, name VARCHAR(500) NOT NULL, completed BOOLEAN NOT NULL);`;
      // - cannot pass dynamic variable to CREATE TABLE ${PG_TABLE}
      // - cause:
      //   - Could it be because sql`` wraps the variable in a single quote
      //   - So it would look like this: CREATE TABLE 'todos'

      if (!isExist) {

        const query2 = sql`CREATE TABLE ${sql.identifier([PG_TABLE])}(id SERIAL PRIMARY KEY, name VARCHAR(500) NOT NULL, completed BOOLEAN NOT NULL);`;
        console.log('CREATE TABLE query=', { query2 });

        const result2 = await connection.query(query2);
        console.log("CREATE TABLE result -", { result2 });
      }

    } catch (err) {
      console.log(err);
    }
  });
};

init();
