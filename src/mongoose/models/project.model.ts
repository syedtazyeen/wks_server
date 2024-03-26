import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'


const projectSchema = new mongoose.Schema(
    {
        projectId: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            index: true
        },
        title: {
            type: String,
            required: true,
            index: true
        },
        author: {
            type: String,
            required: true,

        },
        subtitle: {
            type: String,

        },
        description: {
            type: String,

        },
        coverImageUrl: String,

        tags: [String],

        isActive: {
            type: Boolean,
            default: false
        },
        isPublic: {
            type: Boolean,
            default: false
        },
         totalVisits: {
            type: Number,
            default: 0
        },



    },
    {
        timestamps: true
    }
)



projectSchema.plugin(mongooseAggregatePaginate)

export const Project = mongoose.model('Project', projectSchema)