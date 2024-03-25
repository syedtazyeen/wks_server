"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const userSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true
});
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next()
//     const salt = randomBytes(32).toString("hex");
//     this.password = createHmac('sha256', salt)
//         .update(this.password)
//         .digest("hex");
//     this.salt = salt
//     next()
// })
userSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.User = mongoose_1.default.model('User', userSchema);
