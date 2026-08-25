import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import healthRouter from '../src/routes/health.routes.js';

const app = express();
app.use(express.json());
app.use('/api', healthRouter);

describe('ShopKaro REST API Suite Unit Tests', () => {
  it('GET /api/health should return 200 OK and healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');

    expect(res.body.message).toContain('ShopKaro Backend API');
  });


  it('GET /api/health should include valid timestamp', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.timestamp).toBeDefined();
  });
});
