import express from 'express';
import { mealPlanController } from '~/controllers/mealPlanController';

const Router = express.Router();

Router.get('/', (req, res) => mealPlanController.getAll(req, res));
Router.get('/detail/:id', (req, res) => mealPlanController.findOne(req, res));
Router.get('/user', (req, res) => mealPlanController.getByUserId(req, res));

Router.post('/', (req, res) => mealPlanController.create(req, res));
Router.put('/:id', (req, res) => mealPlanController.update(req, res));
Router.delete('/:id', (req, res) => mealPlanController.remove(req, res));

export const mealPlanApi = Router;
