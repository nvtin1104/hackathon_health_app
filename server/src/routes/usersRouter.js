/* eslint-disable semi */
import express from 'express';
import { usersController } from '~/controllers/usersController';
const Router = express.Router();

Router.get('/:id', (req, res) => usersController.getUserID(req, res));
Router.get('/email/:email', (req, res) =>
  usersController.getUserEmail(req, res)
);
Router.post('/', (req, res) => usersController.login(req, res));
// name, age, gender, height, weight, fitness, nutrition, exercise, heathRate, sleep, water, comment,
Router.put('/:email', (req, res) => usersController.updateData(req, res));

export const usersApi = Router;
