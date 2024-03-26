import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            index: true
        },
        name: {
            type: String,
            required: true,
            index: true
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        profileImageUrl: String,
        isVerified: {
            type: Boolean,
            default: false
        },
        verifyToken: String,
        verifyTokenExpiry: Date,
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true
    }
)

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next()
//     const salt = randomBytes(32).toString("hex");
//     this.password = createHmac('sha256', salt)
//         .update(this.password)
//         .digest("hex");
//     this.salt = salt
//     next()
// })

userSchema.plugin(mongooseAggregatePaginate)

export const User = mongoose.model('User', userSchema)