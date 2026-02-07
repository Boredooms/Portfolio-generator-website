"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTemplate = exports.saveTemplate = void 0;
const PortfolioConfig_1 = require("../models/PortfolioConfig");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const TEMPLATES_DIR = path_1.default.join(__dirname, '../../templates');
// Ensure templates directory exists
if (!fs_1.default.existsSync(TEMPLATES_DIR)) {
    fs_1.default.mkdirSync(TEMPLATES_DIR, { recursive: true });
}
const saveTemplate = async (req, res) => {
    try {
        const config = req.body;
        let savedConfig;
        if (mongoose_1.default.connection.readyState === 1) {
            // MongoDB Connected
            if (config._id) {
                savedConfig = await PortfolioConfig_1.PortfolioConfigModel.findByIdAndUpdate(config._id, config, { new: true });
            }
            else {
                savedConfig = await PortfolioConfig_1.PortfolioConfigModel.create(config);
            }
            if (!savedConfig) {
                return res.status(404).json({ error: 'Template not found for update' });
            }
            res.json({ id: savedConfig._id, message: 'Template saved successfully (DB)' });
        }
        else {
            // File System Fallback
            const id = config.id || config._id || `local-${Date.now()}`;
            const filePath = path_1.default.join(TEMPLATES_DIR, `${id}.json`);
            // Ensure ID is saved in the config
            const configToSave = { ...config, _id: id, id: id };
            fs_1.default.writeFileSync(filePath, JSON.stringify(configToSave, null, 2));
            res.json({ id: id, message: 'Template saved successfully (Local)' });
        }
    }
    catch (error) {
        console.error('Save error:', error);
        res.status(500).json({ error: 'Failed to save template' });
    }
};
exports.saveTemplate = saveTemplate;
const loadTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongoose_1.default.connection.readyState === 1) {
            const config = await PortfolioConfig_1.PortfolioConfigModel.findById(id);
            if (!config) {
                return res.status(404).json({ error: 'Template not found' });
            }
            res.json(config);
        }
        else {
            // File System Fallback
            const filePath = path_1.default.join(TEMPLATES_DIR, `${id}.json`);
            if (fs_1.default.existsSync(filePath)) {
                const fileData = fs_1.default.readFileSync(filePath, 'utf-8');
                res.json(JSON.parse(fileData));
            }
            else {
                res.status(404).json({ error: 'Template not found (Local)' });
            }
        }
    }
    catch (error) {
        console.error('Load error:', error);
        res.status(500).json({ error: 'Failed to load template' });
    }
};
exports.loadTemplate = loadTemplate;
