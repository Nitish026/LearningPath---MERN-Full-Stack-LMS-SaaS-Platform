import dotenv from 'dotenv';
dotenv.config({});
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './Database/dbConnect.js';
import UserRouter from './routes/user.routes.js';
import CourseRouter from './routes/course.routes.js';
import LectureRouter from './routes/lecture.routes.js';
import enrollmentRouter from './routes/enrollment.routes.js';
import progressRouter from './routes/progress.routes.js';
import leadRouter from './routes/lead.routes.js';
import paymentRouter from './routes/payment.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Default Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use((req, res, next) => {
  if (req.url.includes('/profile')) {
    console.log('PROFILE REQUEST:', req.url);
  }
  next();
});

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/course', CourseRouter);
app.use('/api/v1/lecture', LectureRouter);
app.use('/api/v1/enrollment', enrollmentRouter);
app.use('/api/v1/progress', progressRouter);
app.use('/api/v1/lead', leadRouter);
app.use('/api/v1/payment', paymentRouter);

app.get('/home', (_, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Home Page!',
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
startServer();
