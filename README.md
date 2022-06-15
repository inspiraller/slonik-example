- MAINREPO: https://github.com/inspiraller/slonik_example.git

# Setup - .env
- cp .env.example .env

# Setup - main
- git clone MAINREPO
- cd MAINREPO
- npm i

# Setup - node-app
- cd node-app
- npm i

# Start - db
- cd MAINREPO
- npm run db

# Start - node-app
- cd MAINREPO
- npm run server

***expected***
- Will run docker-compose to download and run postgres on local port **(and seed db with a table name declared in .env file)**
- Will run node-app/src/server.ts - to connect to local port for postgres

-------------------
# Kill db
- npm run db-clear
- docker image ls

REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
postgres     12        08644498ca7b   7 minutes ago   376MB

- docker image rm 08644498ca7b

***expected**
- Will Stop the docker container for postgres-db
- Will clear the data in the database

## Remove image if needing to rebuild
docker image ls
docker image rm id