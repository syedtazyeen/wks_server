import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { gql } from "apollo-server-express";
import ServerError from "../utils/ServerError";
import { Project } from "./project";

async function createApolloServer() {
    try {
        const typeDefs = gql`

        ${User.typedefs}
        ${Project.typedefs}
        
        type Query {
           ${User.queries}
           ${Project.queries}
        }
        
        type Mutation {
            ${User.mutations}
            ${Project.mutations}
        }
    `;

        const resolvers = {
            Query: {
                ...User.resolvers.queries,
                ...Project.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Project.resolvers.mutations
            }
        };

        const apollo = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true,
        });

        await apollo.start();

        return apollo;
    } catch (error) {
        console.error("Apollo Server initialization error:", error);
        throw new ServerError(500)
    }
}

export default createApolloServer;