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
  password: Joi.string().required(),
  token: Joi.string().default(null),
  name: Joi.string().default(null),
  age: Joi.number().min(1).max(100).default(null),
  gender: Joi.number().default(3).min(1).max(3),

  height: Joi.number().min(0).default(null),
  weight: Joi.number().min(0).default(null),

  fitness: Joi.string().default(null),
  nutrition: Joi.string().default(null),

  exercise: Joi.number().default(null),
  healthRate: Joi.number().default(null),
  sleep: Joi.number().default(null),
  water: Joi.number().default(null),
  comment: Joi.string().default(null),

  goal: Joi.string().default(null),
  pathological: Joi.string().default(null),

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

  goal: Joi.string().default(null),
  pathological: Joi.string().default(null),
});

export const CREATE_WORKOUT_PLAN_SCHEMA = Joi.object({
  userId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  exercises: Joi.array()
    .required()
    .items(
      Joi.object({
        name: Joi.string().required(),
        time: Joi.number().default(null), // minutes
        qty: Joi.number().default(null),
        note: Joi.string().default(null),
        completed: Joi.boolean().default(false),
      })
    ),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
});

export const UPDATE_WORKOUT_PLAN = Joi.object({
  exercises: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      time: Joi.number().default(0), // minutes
      qty: Joi.number().default(0),
      note: Joi.string().default(''),
      completed: Joi.boolean().default(false),
    })
  ),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now),
});

export const CREATE_MEAL_PLAN_SCHEMA = Joi.object({
  userId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  meals: Joi.object({
    breakfast: Joi.string().default(null),
    lunch: Joi.string().default(null),
    dinner: Joi.string().default(null),
  }),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
});

export const CREATE_DAILY_ACT_SCHEMA = Joi.object({
  userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  date: Joi.date().timestamp('javascript').default(Date.now),
  meals: Joi.object().default({}),
  exercises: Joi.array().default([]),
  waters: Joi.array().default([]),
  sleep: Joi.object().default({}),
})
