import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { CREATE_WORKOUT_PLAN_SCHEMA, UPDATE_WORKOUT_PLAN } from '~/utils/schema';

const validateBeforeCreate = async (data) => {
  return await CREATE_WORKOUT_PLAN_SCHEMA.validateAsync(data, { abortEarly: false });
}

const validateBeforeUpdate = async (data) => {
  return await UPDATE_WORKOUT_PLAN.validateAsync(data, { abortEarly: false });
}

const getAll = async() => {
  const collection = await GET_DB().collection('workoutPlans');

  return await collection.find({}).toArray();
};

const getAllByUserId = async (userId) => {
  const collection = await GET_DB().collection('workoutPlans');

  return await collection.find({ userId: userId }).toArray();
}

const findOne = async (id) => {
  const collection = await GET_DB().collection('workoutPlans');

  return await collection.findOne({ _id: new ObjectId(id) });
}

const create = async (data) => {
  console.log(data)
  const validData = await validateBeforeCreate(data);
  const collection = await GET_DB().collection('workoutPlans');

  return await collection.insertOne(validData);
}

const update = async (id, data) => {
  const validData = await validateBeforeUpdate(data);
  const collection = await GET_DB().collection('workoutPlans');

  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: validData });
}

const remove = async (id) => {
  const collection = await GET_DB().collection('workoutPlans');

  return await collection.deleteOne({ _id: new ObjectId(id) });
}

export default {
  getAll,
  getAllByUserId,
  findOne,
  create,
  update,
  remove
}