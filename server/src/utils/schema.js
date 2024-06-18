/* eslint-disable comma-dangle */
import Joi from 'joi';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

export const SAVE_USER_SCHEMA = Joi.object({
  //   userId: Joi.string()
  //     .required()
  //     .pattern(OBJECT_ID_RULE)
  //     .message(OBJECT_ID_RULE_MESSAGE),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  tokenGG: Joi.string().required(),

  name: Joi.string().default(null),
  age: Joi.number().min(1).max(100).default(null),
  gender: Joi.number().default(3).min(1).max(3),

  height: Joi.number().min(0).default(null),
  weight: Joi.number().min(0).default(null),

  fitness: Joi.string().default(null),
  nutrition: Joi.string().default(null),

  exercise: Joi.number().default(null),
  heathRate: Joi.number().default(null),
  sleep: Joi.number().default(null),
  water: Joi.number().default(null),
  comment: Joi.string().default(null),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
});

export const UPDATE_USER = Joi.object({
  name: Joi.string().default(null),
  age: Joi.number().min(1).max(100).default(null),
  gender: Joi.number().default(3).min(1).max(3),

  height: Joi.number().min(0).default(null),
  weight: Joi.number().min(0).default(null),

  fitness: Joi.string().default(null),
  nutrition: Joi.string().default(null),

  exercise: Joi.number().default(null),
  heathRate: Joi.number().default(null),
  sleep: Joi.number().default(null),
  water: Joi.number().default(null),
  comment: Joi.string().default(null),
});
