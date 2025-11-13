const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Connect to the database
connectDB();


dotenv.config();
const app = express();

// Basic middleware to parse JSON bodies
app.use(express.json());

// Custom middleware for logging
app.use(require('./middleware/logger'));

// Root "Hello World" route 
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Auth middleware for /api routes 
app.use('/api', require('./middleware/auth'));

// Routes
app.use('/api/products', require('./routes/products'));

// Global error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  const error = new (require('./utils/errors').NotFoundError)('Route not found');
  res.status(error.status).json({ error: { message: error.message } });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;