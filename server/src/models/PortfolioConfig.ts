import mongoose from 'mongoose';

const PortfolioConfigSchema = new mongoose.Schema({
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
        data: mongoose.Schema.Types.Mixed
    }]
}, { timestamps: true });

export const PortfolioConfigModel = mongoose.model('PortfolioConfig', PortfolioConfigSchema);
