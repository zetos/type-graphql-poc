#!/bin/sh

echo "Build docker image"
docker build -t zetos/postgresql-test .

echo "Run docker container"
docker run -p 5432:5432 -d zetos/postgresql-test

# echo "Connect to the container"
# docker exec -it <container_id> psql -U zeno test