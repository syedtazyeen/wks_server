import UserService, { LoginUserPayload, RegisterUserPayload } from "../../services/user"

const queries = {}

const mutations = {
    registerNewUser: async (_: any, payload: RegisterUserPayload) => {
        const response = await UserService.registerUser(payload)
        return { accessToken: response.accessToken }
    },

    loginUser: async (_: any, payload: LoginUserPayload) => {
        const response = await UserService.loginUser(payload)
        return { accessToken: response.accessToken }
    }
}

export const resolvers = { queries, mutations }
