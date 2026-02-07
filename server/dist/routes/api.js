"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generator_1 = require("../controllers/generator");
const configController_1 = require("../controllers/configController");
const router = express_1.default.Router();
router.post('/download', generator_1.generatePortfolio);
router.post('/save', configController_1.saveTemplate);
router.get('/load/:id', configController_1.loadTemplate);
// TODO: standard save/load routes if using MongoDB
router.get('/health', (req, res) => res.json({ status: 'ok' }));
exports.default = router;
