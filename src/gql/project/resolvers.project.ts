import ProjectService from "../../services/project"

const queries = {
    getTrendingProjects: async () => {
        return ProjectService.getTrendingProjectsFromDb()
    }
}

const mutations = {}

export const resolvers = { queries, mutations }
