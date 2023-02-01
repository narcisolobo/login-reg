import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
app.use(express.json(), cors());

import connectToDb from './config/mongoose-config.js';
connectToDb();

import userRouter from './routes/user-routes.js';
app.use('/api/users', userRouter);

import { primary, error } from './config/chalk-config.js';
const PORT = process.env.PORT || 5001;
const server = app
  .listen(PORT, () => primary(`Listening on port: ${server.address().port}`))
  .on('error', (err) => error(`Something went wrong: ${err}`));
