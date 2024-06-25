/* eslint-disable semi */
import express from 'express';
import { usersApi } from './usersRouter';
import { workoutPlanApi } from '~/routes/workoutPlanRouter';
import botRouter from '~/routes/botRouter';
import chatRouter from '~/routes/chatRouter';
import verifyToken from '~/middlewares';

const Router = express.Router();

// user
Router.use('/users', usersApi);

// Workout Plan
Router.use('/wp', verifyToken, workoutPlanApi);
Router.use('/bot', botRouter);
Router.use('/chat',verifyToken, chatRouter);

Router.get('/', (req, res) => {
  res.send('Hello from API!');
});
// export default Router;
export const APIs = Router;
