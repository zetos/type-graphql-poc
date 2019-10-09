FROM postgres:11-alpine

ENV POSTGRES_PASSWORD=paradox \
    POSTGRES_USER=zeno \
    POSTGRES_DB=foo-db

VOLUME [ "pgdata:/var/lib/postgresql/data" ]

EXPOSE 5432
