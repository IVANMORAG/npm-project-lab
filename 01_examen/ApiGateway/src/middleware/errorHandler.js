// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
    
    res.status(statusCode).json({ 
      error: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  };
  
  module.exports = { errorHandler };