"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedefs = void 0;
exports.typedefs = `#graphql

type User {
    email: String!
}

type AuthResultResponse {
    accessToken: String!
}
`;
