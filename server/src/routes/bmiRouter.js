import express from 'express';
import { bmiController } from '~/controllers/bmiController';

const Router = express.Router();

Router.get('/7time', (req, res) => bmiController.get7Time(req, res));
Router.post('/', (req, res) => bmiController.create(req, res));

export const bmiApi = Router;
