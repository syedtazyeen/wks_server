"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const queries_user_1 = require("./queries.user");
const mutations_user_1 = require("./mutations.user");
const typedef_user_1 = require("./typedef.user");
const resolvers_user_1 = require("./resolvers.user");
exports.User = { queries: queries_user_1.queries, mutations: mutations_user_1.mutations, typedefs: typedef_user_1.typedefs, resolvers: resolvers_user_1.resolvers };
