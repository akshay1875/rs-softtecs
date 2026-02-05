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
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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
