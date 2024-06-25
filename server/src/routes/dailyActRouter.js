import express from 'express';
import { dailyActController } from '~/controllers/dailyActController';

const Router = express.Router();

Router.post('/getInfo', (req, res) => dailyActController.getByUserId(req, res));
Router.post('/', (req, res) => dailyActController.create(req, res));
Router.put('/:id', (req, res) => dailyActController.update(req, res));

export const dailyActApi = Router;
