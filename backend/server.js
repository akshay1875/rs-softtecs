const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const reviewRoutes = require('./routes/reviews');
const testimonialRoutes = require('./routes/testimonials');
const enquiryRoutes = require('./routes/enquiries');
const teamRoutes = require('./routes/team');
const settingsRoutes = require('./routes/settings');

// Connect to database
connectDB();

const app = express();

// Body parser with increased limit for base64 images
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enable CORS
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  'https://rs-softtecs.vercel.app',
  'https://rs-softtecs-dkp2.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed.replace(/\/$/, '')))) {
      return callback(null, true);
    }
    // Allow any vercel.app subdomain
    if (origin.includes('vercel.app')) {
      return callback(null, true);
    }
    callback(null, true); // Allow all for now
  },
  credentials: true
}));

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/settings', settingsRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'RS Softtecs API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      courses: '/api/courses',
      reviews: '/api/reviews',
      testimonials: '/api/testimonials',
      team: '/api/team'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'RS Softtecs API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handler middleware
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════════════╗
  ║                                                    ║
  ║   RS Softtecs Backend API                          ║
  ║   Server running in ${process.env.NODE_ENV || 'development'} mode              ║
  ║   Port: ${PORT}                                       ║
  ║                                                    ║
  ╚════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
