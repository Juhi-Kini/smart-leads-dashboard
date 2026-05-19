import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANT: Make sure routes are mounted correctly
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'Smart Leads API is running!',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      leads: {
        list: 'GET /api/leads',
        create: 'POST /api/leads',
        update: 'PUT /api/leads/:id',
        delete: 'DELETE /api/leads/:id',
        export: 'GET /api/leads/export'
      },
      health: 'GET /health'
    }
  });
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler - must be last
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

export default app;
