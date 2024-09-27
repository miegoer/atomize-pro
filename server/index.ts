import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import goalRoutes from './src/routes/goal.routes';
import tabRoutes from './src/routes/tab.routes';

const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (like cookies) to be sent
};

const app: Application = express();
const PORT: string | number = process.env.SERVER_PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', goalRoutes);
app.use('/api', tabRoutes);

app.listen(PORT, (err?: Error) => {
  if (err) {
    console.log(`😞 Something went wrong connecting to the server! ${err}`);
  } else {
    console.log(`🚀 The server is running and listening on port ${PORT}!`);
  }
});

export default app;
