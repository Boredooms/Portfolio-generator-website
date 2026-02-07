"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioConfigModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PortfolioConfigSchema = new mongoose_1.default.Schema({
    theme: {
        accentColor: String,
        gradient: Boolean,
        font: String
    },
    personal: {
        name: String,
        bio: String,
        roles: [String],
        social: {
            github: String,
            linkedin: String,
            twitter: String,
            email: String
        }
    },
    projects: [{
            id: String,
            title: String,
            description: String,
            tags: [String],
            link: String,
            repo: String
        }],
    sections: [{
            id: String,
            type: { type: String }, // type is a reserved word
            title: String,
            enabled: Boolean,
            data: mongoose_1.default.Schema.Types.Mixed
        }]
}, { timestamps: true });
exports.PortfolioConfigModel = mongoose_1.default.model('PortfolioConfig', PortfolioConfigSchema);
