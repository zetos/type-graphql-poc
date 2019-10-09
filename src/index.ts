import 'reflect-metadata';
import {ApolloServer} from 'apollo-server-express';
import * as express from 'express';
import { buildSchema, Resolver, Query } from 'type-graphql';

@Resolver()
class RecipeResolver {
    @Query(() => String)
    async hello() {
        return 'Hello World Resolver'
    }
}

const server = async () => {
    const schema = await buildSchema({
        resolvers: [RecipeResolver],
    });

    const apolloServer = new ApolloServer({schema});
    const app = express();

    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql')
    })
}

server();