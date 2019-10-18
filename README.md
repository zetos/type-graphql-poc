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

* **Redis** service running on the localhost and default port (6379).

* **Docker (Optional)** check the `Dockerfile` and run the `setup.sh` for running the `psql` service inside a container.
> **WARNING:** Make sure you dont already have a service running on the port **5432** (Default psql port). Also, it does not create the db for running tests.


## GraphQL Schema
> WIP. Extracted from the GraphQL Playground.

```js

type Mutation {
  register(data: RegisterInput!): User!
  login(password: String!, email: String!): User
  confirmUser(token: String!): Boolean!
}

type Query {
  hello: String!
  me: User
}

input RegisterInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
}

type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  name: String!
}

```

## Running Tests

You can play on the graphql playground just by running the project `npm start`,
but for testing the file upload you will need to use the *Insomnia* ou *Postman* to make a post request with the graphql query (You can also use [cURL](https://github.com/jaydenseric/graphql-multipart-request-spec#curl-request)).

The request:

create a POST request to `localhost:3001/graphql` with the body type of `form-data` and:

KEY        | Value 
---        | --- 
operations | {"query":"mutation AddProfilePicture($picture: Upload!) {\n  addProfilePicture(picture: $picture)\n}"}
map        | {"0": ["variables.picture"]}
0          | < Upload the file here >

Body:

```json
{
  "data": {
    "addProfilePicture": true
  }
}
```

### For running the test script:

Create another postgres db for running tests.  
To manually create it:

```sh
psql postgres -U zeno
psql (11.5)
Type "help" for help.

postgres=> CREATE DATABASE foodb_test;
CREATE DATABASE
postgres=> GRANT ALL PRIVILEGES ON DATABASE foodb_test TO zeno;
GRANT
postgres=> exit
```

This new DB should follow the configuration of the `testConn.ts` file.

Once you this new db service running run the npm script: `npm run test`


