import { Project } from "../mongoose/models/project.model"
import ServerError from "../utils/ServerError"

export default class ProjectService {

    // fetch thumnail of trending projects
    public static async getTrendingProjectsFromDb() {
        try {
            return await Project.find({},
                `projectId 
                title 
                subtitle
                author 
                tags 
                isActive
                totalVisits
                coverImageUrl`);
        } catch (error: any) {
            throw new ServerError(error.code, error.message)
        }
    }
}