// src/index.ts

// 1. THIS MUST BE THE FIRST LINE
import 'dotenv/config'; 

// 2. Import everything else
import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'; 
import router from './routes'; 

// --- DEBUG CHECK: Remove this after it works ---
console.log("Checking Env Variables...");
if (!process.env.CLERK_PUBLISHABLE_KEY) {
  console.error("❌ CLERK_PUBLISHABLE_KEY is undefined. Check your .env file location and naming.");
} else {
  console.log("✅ CLERK_PUBLISHABLE_KEY found starting with:", process.env.CLERK_PUBLISHABLE_KEY.substring(0, 10));
}
// -----------------------------------------------

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 3. MOUNT CLERK MIDDLEWARE
// 🎯 CRITICAL CHANGE: Enable debugging here
app.use(clerkMiddleware({ debug: true })); 

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Pill Tracker Backend is Running!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});