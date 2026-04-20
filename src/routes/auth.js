import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

// Hash generado una vez al arrancar para no recalcular en cada petición
const passwordHash = await bcrypt.hash(process.env.AUTH_PASSWORD, 10);

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  const usernameMatch = username === process.env.AUTH_USER;
  const passwordMatch = await bcrypt.compare(password, passwordHash);

  if (!usernameMatch || !passwordMatch) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token });
});

export default router;
