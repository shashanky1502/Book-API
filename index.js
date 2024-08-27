const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const { swaggerUi, swaggerSpec } = require('./swagger');
require('dotenv').config(); 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

app.use('/api/books', require('./routes/bookRoutes'));

// Serve Swagger API 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
