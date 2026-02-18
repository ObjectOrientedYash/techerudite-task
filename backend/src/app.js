import express from 'express';
import cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import typeDefs from './graphql/typeDef.js';
import resolvers from './graphql/resolvers.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// considering client url as array of multiple origins to allow
const allowedOrigins = process.env.CLIENT_URL.split(',');

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    })
);
app.use(express.json());

const server = new ApolloServer({
    typeDefs,
    resolvers
});

await server.start();
server.applyMiddleware({app, path: '/graphql'});

export default app;
