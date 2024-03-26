import UserService, { LoginUserPayload, RegisterUserPayload } from "../../services/user"

const queries = {
    getCurrentUser: async (parent: any, args: any, context: any) => {
        const accessToken = context.accessToken as string
        if (context && accessToken) return UserService.decrpytUserToken(accessToken)     
    }

}

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
