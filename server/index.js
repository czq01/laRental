import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config.js';
import houseRouter from './routes/house.js';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';

// connect to cloud MongoDB
mongoose.connect(config.mongo_url);

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/house', houseRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(config.port, 
    () => console.log(`Server running on port: http://localhost:${config.port}`));
