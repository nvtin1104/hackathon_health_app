import express from 'express';
import { genAIController } from '~/controllers/genAIController';
import { workoutPlanController } from '~/controllers/workoutPlanController';

const Router = express.Router();

Router.get('/', (req, res) => workoutPlanController.getAll(req, res));
Router.get('/:id', (req, res) => workoutPlanController.findOne(req, res));
Router.post('/', (req, res) => workoutPlanController.create(req, res));
Router.put('/:id', (req, res) => workoutPlanController.update(req, res));
Router.delete('/:id', (req, res) => workoutPlanController.remove(req, res));

Router.post('/overviewHealth', (req, res) => genAIController.genGPTAIOverview(req, res));
Router.post('/workoutPlan', (req, res) => genAIController.genGPTAIWorkoutPlan(req, res));
Router.post('/mealPlan', (req, res) => genAIController.genGPTAIMealPlan(req, res));

export const workoutPlanApi = Router;
