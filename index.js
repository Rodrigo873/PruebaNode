import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './src/routes/auth.js';
import chatRoutes from './src/routes/chat.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
