import { Request, Response } from 'express';
import { PortfolioConfigModel } from '../models/PortfolioConfig';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const TEMPLATES_DIR = path.join(__dirname, '../../templates');

// Ensure templates directory exists
if (!fs.existsSync(TEMPLATES_DIR)) {
    fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
}

export const saveTemplate = async (req: Request, res: Response) => {
    try {
        const config = req.body;
        let savedConfig;

        if (mongoose.connection.readyState === 1) {
            // MongoDB Connected
            if (config._id) {
                savedConfig = await PortfolioConfigModel.findByIdAndUpdate(config._id, config, { new: true });
            } else {
                savedConfig = await PortfolioConfigModel.create(config);
            }
            if (!savedConfig) {
                return res.status(404).json({ error: 'Template not found for update' });
            }
            res.json({ id: savedConfig._id, message: 'Template saved successfully (DB)' });
        } else {
            // File System Fallback
            const id = config.id || config._id || `local-${Date.now()}`;
            const filePath = path.join(TEMPLATES_DIR, `${id}.json`);

            // Ensure ID is saved in the config
            const configToSave = { ...config, _id: id, id: id };

            fs.writeFileSync(filePath, JSON.stringify(configToSave, null, 2));
            res.json({ id: id, message: 'Template saved successfully (Local)' });
        }
    } catch (error) {
        console.error('Save error:', error);
        res.status(500).json({ error: 'Failed to save template' });
    }
};

export const loadTemplate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (mongoose.connection.readyState === 1) {
            const config = await PortfolioConfigModel.findById(id);
            if (!config) {
                return res.status(404).json({ error: 'Template not found' });
            }
            res.json(config);
        } else {
            // File System Fallback
            const filePath = path.join(TEMPLATES_DIR, `${id}.json`);
            if (fs.existsSync(filePath)) {
                const fileData = fs.readFileSync(filePath, 'utf-8');
                res.json(JSON.parse(fileData));
            } else {
                res.status(404).json({ error: 'Template not found (Local)' });
            }
        }
    } catch (error) {
        console.error('Load error:', error);
        res.status(500).json({ error: 'Failed to load template' });
    }
};
