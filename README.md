# Type-graphql-poc
> Created by following the [playlist of Ben Awad](https://www.youtube.com/playlist?list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs)

This is a **WIP** poc using type-graphql module and test its decorators.

## Notes WIP

The graphql playground setting should include the config: `"request.credentials": "include"`

## Requires

* **PostgresDB** the `ormconfig.json` file has the configuration for the postgres service:

```json
{
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "zeno",
    "password": "paradox",
    "database": "foodb",
    "synchronize": true,
    "logging": true,
    "entities": ["src/entity/*.*"]
}
```

* **Redis** service running on the localhost.

* **Docker (Optional)** check the `Dockerfile` and run the `setup.sh` for running the `psql` service inside a container.
> **WARNING:** Make sure you dont already have a service running on the port **5432** (Default psql port).
