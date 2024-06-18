/* eslint-disable semi */
import express from 'express';
import { usersApi } from './usersRouter';
const Router = express.Router();

// user
Router.use('/users', usersApi);

Router.get('/', (req, res) => {
  res.send('Hello from API!');
});
// export default Router;
export const APIs = Router;
