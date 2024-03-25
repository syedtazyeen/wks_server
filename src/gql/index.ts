import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { gql } from "apollo-server-express";
import { typedefs } from './user/typedef.user';
import ServerError from "../utils/ServerError";


async function createApolloServer() {
    try {
        const typeDefs = gql`
        ${typedefs}
        
        type Query {
            hello: String
        }
        
        type Mutation {
            ${User.mutations}
        }
    `;

        const resolvers = {
            Query: {
                ...User.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        };

        const apollo = new ApolloServer({
            typeDefs,
            resolvers
        });

        await apollo.start();

        return apollo;
    } catch (error) {
        console.error("Apollo Server initialization error:", error);
        throw new ServerError(500)
    }
}

export default createApolloServer;