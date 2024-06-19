/* eslint-disable semi */
import express from 'express';
import { usersApi } from './usersRouter';
import { workoutPlanApi } from '~/routes/workoutPlanRouter';
import verifyToken from '~/middlewares';

const Router = express.Router();

// user
Router.use('/users', usersApi);

// Workout Plan
Router.use('/wp', verifyToken, workoutPlanApi);

Router.get('/', (req, res) => {
  res.send('Hello from API!');
});
// export default Router;
export const APIs = Router;
