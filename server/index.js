import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

// Add this line to configure CORS
const allowedOrigins = ['https://image-generator-app-mu.vercel.app'];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true, // This allows cookies and tokens to be sent across origins
};

// Use CORS middleware before defining any routes


const app = express();

app.use(cors(corsOptions));
app.use(cors());
app.use(express.json({ limit: '50mb' }));

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

