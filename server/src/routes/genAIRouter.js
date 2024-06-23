import express from 'express';
import { genAIController } from '~/controllers/genAIController';

const Router = express.Router();

Router.post('/overviewHealth', (req, res) => genAIController.genGPTAIOverview(req, res));
Router.post('/workoutPlan', (req, res) => genAIController.genGPTAIWorkoutPlan(req, res));
Router.post('/mealPlan', (req, res) => genAIController.genGPTAIMealPlan(req, res));

export const genAIRouter = Router;