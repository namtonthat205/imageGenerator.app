import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

// Add this line to configure CORS
const allowedOrigins = ['https://image-generator-app-mu.vercel.app', 'http://localhost:5173'];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true, // This allows cookies and tokens to be sent across origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use CORS middleware before defining any routes


const app = express();

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(express.json({ limit: '50mb' }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // Allow the origin making the request
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});
// Update likes for a specific post by ID (add/remove like)

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();

