/* eslint-disable semi */
import express from 'express';
import { botController } from '~/controllers/botController';
import verifyToken from '~/middlewares';

const Router = express.Router();
// tạo bot chat vidu gpt gemini

Router.post('/', (req, res) => botController.post(req, res));
Router.put('/:id', (req, res) => botController.update(req, res));
Router.get('/', (req, res) => botController.get(req, res));
Router.delete('/:id', (req, res) => botController.remove(req, res));

module.exports = Router;
