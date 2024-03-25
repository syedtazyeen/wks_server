"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const user_1 = require("./user");
const apollo_server_express_1 = require("apollo-server-express");
const typedef_user_1 = require("./user/typedef.user");
const ServerError_1 = __importDefault(require("../utils/ServerError"));
function createApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const typeDefs = (0, apollo_server_express_1.gql) `
        ${typedef_user_1.typedefs}
        
        type Query {
            hello: String
        }
        
        type Mutation {
            ${user_1.User.mutations}
        }
    `;
            const resolvers = {
                Query: Object.assign({}, user_1.User.resolvers.queries),
                Mutation: Object.assign({}, user_1.User.resolvers.mutations)
            };
            const apollo = new server_1.ApolloServer({
                typeDefs,
                resolvers
            });
            yield apollo.start();
            return apollo;
        }
        catch (error) {
            console.error("Apollo Server initialization error:", error);
            throw new ServerError_1.default(500);
        }
    });
}
exports.default = createApolloServer;
