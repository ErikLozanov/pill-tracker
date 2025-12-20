
import 'dotenv/config'; 

import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'; 
import router from './routes'; 


const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// 3. MOUNT CLERK MIDDLEWARE
app.use(clerkMiddleware({ debug: false })); 

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Pill Tracker Backend is Running!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});