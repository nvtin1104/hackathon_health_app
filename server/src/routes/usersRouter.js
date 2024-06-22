/* eslint-disable semi */
import express from 'express';
import { usersController } from '~/controllers/usersController';
import verifyToken from '~/middlewares';

const Router = express.Router();

Router.post('/register', (req, res) => usersController.register(req, res));
Router.post('/', (req, res) => usersController.login(req, res));
// name, age, gender, height, weight, fitness, nutrition, exercise, heathRate, sleep, water, comment,
Router.put('/', verifyToken, (req, res) => usersController.update(req, res));
Router.get('/', verifyToken, (req, res) => usersController.getU(req, res));
Router.put('/changePass', verifyToken, (req, res) =>
  usersController.changePassWord(req, res)
);

Router.get('/test', verifyToken, (req, res) => usersController.test(req, res));
Router.get('/:id', (req, res) => usersController.getUserID(req, res));
Router.get('/email/:email', (req, res) =>
  usersController.getUserEmail(req, res)
);
Router.put('/email/:email', (req, res) =>
  usersController.updateByEmail(req, res)
);

export const usersApi = Router;
