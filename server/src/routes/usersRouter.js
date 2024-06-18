/* eslint-disable semi */
import express from 'express';
import { usersController } from '~/controllers/usersController';
const Router = express.Router();

Router.get('/', (req, res) => usersController.getUser(req, res));
Router.post('/', (req, res) => usersController.add(req, res));

export const usersApi = Router;
