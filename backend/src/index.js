import express from 'express';
import cors from 'cors';

import db from './db/connect.js';

import userRouter from './routers/user.js';
import videoRouter from './routers/video.js';
import commentRouter from './routers/comment.js';
import notificationRouter from './routers/notification.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(videoRouter);
app.use(commentRouter);
app.use(notificationRouter);

app.listen(port, ()=>{console.log(`server running on port ${port}`)});