import 'reflect-metadata';
import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { RegisterResolver } from './modules/user/Register';
import { redis } from './redis';
import { LoginResolver } from './modules/user/Login';
import { MeResolver } from './modules/user/Me';
import { ConfirmUserResolver } from './modules/user/ConfirmUser';
import { LogoutResolver } from './modules/user/Logout';


const server = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [MeResolver, RegisterResolver, LoginResolver, ConfirmUserResolver, LogoutResolver],
        authChecker: ({context: {req}}) => !!req.session.userId 
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({req, res}: any) => ({req, res})
    });
    const app = express();

    const RedisStore = connectRedis(session);

    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000' // frontend
    }));

    app.use(
        session({
        store: new RedisStore({
            client: redis as any,
        }),
        name: 'qid',
        secret: 'hardcodedsecret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        },
    }))

    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql');
    })
}

server();