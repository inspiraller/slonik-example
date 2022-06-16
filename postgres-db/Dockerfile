FROM postgres
ARG PG_TABLE


# COPY todos.init.csv /var/lib/postgresql/data/pgdata/todos.init.csv
# COPY todos.init.csv /var/lib/postgresql/data/todos.init.csv

ADD seed.sql /docker-entrypoint-initdb.d/seed.sql

# pass variable PG_TABLE to script.sh to replace ${PG_TABLE} with .env variable in seed.sql
WORKDIR /scripts
COPY script.sh .
RUN chmod +x script.sh
RUN /scripts/script.sh PG_TABLE "${PG_TABLE}"

RUN chmod a+r /docker-entrypoint-initdb.d/*
EXPOSE 6666

