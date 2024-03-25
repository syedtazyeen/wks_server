"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql
registerNewUser(
    name: String!,
    email: String!,
    password: String!)
    : AuthResultResponse!

loginUser(
    email: String!,
    password: String!) 
    : AuthResultResponse!
`;
