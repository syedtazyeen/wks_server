export const typedefs = `#graphql



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


`