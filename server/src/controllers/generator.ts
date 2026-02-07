import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const CLIENT_PATH = path.resolve(__dirname, '../../../client');

export const generatePortfolio = async (req: Request, res: Response) => {
  try {
    const config = req.body;
    console.log('Generating portfolio with config for:', config.personal?.name);
    console.log('CLIENT_PATH resolved to:', CLIENT_PATH);

    // Set headers for zip download
    res.attachment('portfolio-project.zip');

    const archive = archiver('zip', {
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
    const getFiles = (dir: string): string[] => {
      const dirents = fs.readdirSync(dir, { withFileTypes: true });
      const files = dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : [res];
      });
      return Array.prototype.concat(...files);
    };

    // Add base files
    for (const file of filesToCopy) {
      const filePath = path.join(CLIENT_PATH, file);
      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: file });
      } else {
        console.warn(`Warning: File not found: ${filePath}`);
      }
    }

    // Add Template Components (Recursive)
    const templatesDir = path.join(CLIENT_PATH, 'src/components/templates');
    if (fs.existsSync(templatesDir)) {
      const templateFiles = getFiles(templatesDir);
      for (const file of templateFiles) {
        // Calculate relative path for zip structure
        const relativePath = path.relative(CLIENT_PATH, file);
        archive.file(file, { name: relativePath.replace(/\\/g, '/') }); // Ensure forward slashes for zip
      }
    }

    // 5. Check if PortfolioView needs any other dependencies?
    // It imports types/config.ts (handled above).
    // It doesn't use hooks or other components.

    // Finalize
    await archive.finalize();

  } catch (error) {
    console.error('Generator error:', error);
    res.status(500).json({ error: 'Failed to generate project' });
  }
};
