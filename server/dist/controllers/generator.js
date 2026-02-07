"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePortfolio = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const archiver_1 = __importDefault(require("archiver"));
const CLIENT_PATH = path_1.default.resolve(__dirname, '../../../client');
const generatePortfolio = async (req, res) => {
    try {
        const config = req.body;
        console.log('Generating portfolio with config for:', config.personal?.name);
        console.log('CLIENT_PATH resolved to:', CLIENT_PATH);
        // Set headers for zip download
        res.attachment('portfolio-project.zip');
        const archive = (0, archiver_1.default)('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        archive.on('error', (err) => {
            console.error('Archiver error:', err);
            res.status(500).send({ error: err.message });
        });
        archive.pipe(res);
        // 1. Add Configuration
        archive.append(JSON.stringify(config, null, 2), { name: 'src/config.json' });
        // 2. Add App.tsx (Custom for standalone)
        const appTsxContent = `
import { PortfolioView } from './components/portfolio/PortfolioView';
import config from './config.json';
// import { PortfolioConfig } from './types/config'; // Types issues with JSON import sometimes, casting is safer

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <PortfolioView config={config as any} />
    </div>
  );
}

export default App;
`;
        archive.append(appTsxContent, { name: 'src/App.tsx' });
        // 3. Add main.tsx
        const mainTsxContent = `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
        archive.append(mainTsxContent, { name: 'src/main.tsx' });
        // 4. Copy specific files from Client
        const filesToCopy = [
            'package.json',
            'tsconfig.json',
            'tsconfig.app.json',
            'tsconfig.node.json',
            'vite.config.ts',
            'index.html',
            'tailwind.config.js',
            'postcss.config.js',
            'src/index.css',
            'src/vite-env.d.ts',
            'src/types/config.ts',
            'src/components/portfolio/PortfolioView.tsx'
        ];
        // Helper to recursively list files in a directory
        const getFiles = (dir) => {
            const dirents = fs_1.default.readdirSync(dir, { withFileTypes: true });
            const files = dirents.map((dirent) => {
                const res = path_1.default.resolve(dir, dirent.name);
                return dirent.isDirectory() ? getFiles(res) : [res];
            });
            return Array.prototype.concat(...files);
        };
        // Add base files
        for (const file of filesToCopy) {
            const filePath = path_1.default.join(CLIENT_PATH, file);
            if (fs_1.default.existsSync(filePath)) {
                archive.file(filePath, { name: file });
            }
            else {
                console.warn(`Warning: File not found: ${filePath}`);
            }
        }
        // Add Template Components (Recursive)
        const templatesDir = path_1.default.join(CLIENT_PATH, 'src/components/templates');
        if (fs_1.default.existsSync(templatesDir)) {
            const templateFiles = getFiles(templatesDir);
            for (const file of templateFiles) {
                // Calculate relative path for zip structure
                const relativePath = path_1.default.relative(CLIENT_PATH, file);
                archive.file(file, { name: relativePath.replace(/\\/g, '/') }); // Ensure forward slashes for zip
            }
        }
        // 5. Check if PortfolioView needs any other dependencies?
        // It imports types/config.ts (handled above).
        // It doesn't use hooks or other components.
        // Finalize
        await archive.finalize();
    }
    catch (error) {
        console.error('Generator error:', error);
        res.status(500).json({ error: 'Failed to generate project' });
    }
};
exports.generatePortfolio = generatePortfolio;
