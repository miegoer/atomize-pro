const express = require('express');
const cors = require("cors");
const router = require('./router.js');
const {connectDB} = require('./db.js');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (like cookies) to be sent
};

const app = express();

// Connect to the database (no need to use app.use)
connectDB();

const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());

// Set up the router
app.use('/api', router);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`😞 Something went wrong connecting to the server! ${err}`);
  } else {
    console.log(`🚀 The server is running and listening on port ${PORT}!`);
  }
});
