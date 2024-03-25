import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import createApolloServer from './gql';
import connectDb from './mongoose/config'


dotenv.config()

async function init() {
    const app = express();
    const PORT = process.env.PORT || 1000

    app.use(cors())
    connectDb()

    app.use('/gql',
        express.json(),
        expressMiddleware(await createApolloServer()));


    app.listen({ port: PORT }, () => {
        console.log(`\nserver running at http://localhost:${PORT}`);
        console.log(`\tgql server running at http://localhost:${PORT}/gql`);
    })
}

init()