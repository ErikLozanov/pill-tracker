// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Pill Tracker Backend is Running!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});