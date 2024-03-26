"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedefs = void 0;
exports.typedefs = `#graphql



type TrendingProject{
projectId: String!,
title: String!,
subtitle: String,
authorId: String,
tags:[String],
isActive: String,
totalVisits: Int,
coverImageUrl: String
}


`;
