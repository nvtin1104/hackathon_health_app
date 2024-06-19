import express from 'express';
import { workoutPlanController } from '~/controllers/workoutPlanController';

const Router = express.Router();

Router.get('/', (req, res) => workoutPlanController.getAll(req, res));
Router.get('/:id', (req, res) => workoutPlanController.findOne(req, res));
Router.post('/', (req, res) => workoutPlanController.create(req, res));
Router.put('/:id', (req, res) => workoutPlanController.update(req, res));
Router.delete('/:id', (req, res) => workoutPlanController.remove(req, res));

export const workoutPlanApi = Router;
