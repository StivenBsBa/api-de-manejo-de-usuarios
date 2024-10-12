import userRouter from '../routes/user.routes.js';
import express from 'express';
const expressApp = express();

// Middleware
expressApp.use(express.json());

// Routers
expressApp.use('/user', userRouter);

export default expressApp;
