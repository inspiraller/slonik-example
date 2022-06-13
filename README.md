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
- Will run docker-compose to download and run postgres on local port
- Will run node-app/src/server.ts - to connect to local port for postgres

-------------------
# Kill db
- npm run db-clear

***expected**
- Will Stop the docker container for postgres-db
- Will clear the data in the database