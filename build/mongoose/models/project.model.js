"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const projectSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true
});
projectSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.Project = mongoose_1.default.model('Project', projectSchema);
