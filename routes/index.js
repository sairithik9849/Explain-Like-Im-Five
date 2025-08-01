import geminiRoutes from './gemini.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Since we are using ES modules, __dirname is not available directly.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const constructorMethod = (app) => {
  // API routes
  app.use('/api/gemini', geminiRoutes);

  // Serve the main HTML file for the root route
  app.get('/', (req, res) => {
    // Construct an absolute path to the HTML file
    const htmlPath = path.resolve(path.join(__dirname, '..', 'public', 'index.html'));
    res.sendFile(htmlPath);
  });

  // Catch-all 404 route
  app.use(/(.*)/, (req, res) => {
    res.status(404).json({ error: 'Resource not found' });
  });
};

export default constructorMethod;
