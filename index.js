import 'dotenv/config';
import express from 'express';
<<<<<<< HEAD
import morgan from 'morgan';
=======
>>>>>>> 0c1da507fdb5c0e13d0551efe664b0e73d68250f
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './src/routes/auth.js';
import chatRoutes from './src/routes/chat.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
app.use(morgan(':method :url :status :response-time ms'));
=======
>>>>>>> 0c1da507fdb5c0e13d0551efe664b0e73d68250f
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
