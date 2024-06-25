/* eslint-disable semi */
import express from 'express';
import { chatController } from '~/controllers/chatController';

const Router = express.Router();
// tạo bot chat vi du gpt gemini

Router.post('/message', (req, res) => chatController.post(req, res));
Router.put('/:id', (req, res) => chatController.update(req, res));
Router.get('/:botId', (req, res) => chatController.get(req, res));
Router.delete('/:id', (req, res) => chatController.remove(req, res));

module.exports = Router;
