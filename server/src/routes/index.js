/* eslint-disable semi */
import express from 'express';
import { usersApi } from './usersRouter';
import { workoutPlanApi } from '~/routes/workoutPlanRouter';
import botRouter from '~/routes/botRouter';
import chatRouter from '~/routes/chatRouter';
import verifyToken from '~/middlewares';
import { mealPlanApi } from './mealPlanRouter';
import { genAIRouter } from './genAIRouter';
import { dailyActApi } from './dailyActRouter';
import { bmiApi } from './bmiRouter';

const Router = express.Router();

// user
Router.use('/users', usersApi);

// Workout Plan
Router.use('/wp', verifyToken, workoutPlanApi);
Router.use('/bot', verifyToken, botRouter);
Router.use('/chat',verifyToken, chatRouter);

// Meal Plan
Router.use('/mp', verifyToken, mealPlanApi);

// BMI
Router.use('/bmi', verifyToken, bmiApi);

// Daily Activities
Router.use('/dlact', verifyToken, dailyActApi);

// GEN AI
Router.use('/ai', verifyToken, genAIRouter);

Router.get('/', (req, res) => {
  res.send('Hello from API!');
});
// export default Router;
export const APIs = Router;
