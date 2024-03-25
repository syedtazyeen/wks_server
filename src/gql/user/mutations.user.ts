export const mutations = `#graphql
registerNewUser(
    name: String!,
    email: String!,
    password: String!)
    : AuthResultResponse!

loginUser(
    email: String!,
    password: String!) 
    : AuthResultResponse!
`