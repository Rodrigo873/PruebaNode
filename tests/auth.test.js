import { describe, it, expect, beforeAll } from 'vitest';
import express from 'express';
import request from 'supertest';

const { default: authRoutes } = await import('../src/routes/auth.js');
const { default: chatRoutes } = await import('../src/routes/chat.js');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

describe('POST /auth/login', () => {
  it('devuelve 200 y un token con credenciales correctas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpass123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('devuelve 401 con credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});

describe('POST /chat', () => {
  it('devuelve 401 sin token', async () => {
    const res = await request(app)
      .post('/chat')
      .send({ text: 'Hola' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
