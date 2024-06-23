/* eslint-disable semi */
import express from 'express';
import { usersApi } from './usersRouter';
import { workoutPlanApi } from '~/routes/workoutPlanRouter';
import verifyToken from '~/middlewares';
import { mealPlanApi } from './mealPlanRouter';
import { genAIRouter } from './genAIRouter';

const Router = express.Router();

// user
Router.use('/users', usersApi);

// Workout Plan
Router.use('/wp', verifyToken, workoutPlanApi);

// Meal Plan
Router.use('/mp', verifyToken, mealPlanApi);

// GEN AI
Router.use('/ai', verifyToken, genAIRouter);

Router.get('/', (req, res) => {
  res.send('Hello from API!');
});
// export default Router;
export const APIs = Router;
