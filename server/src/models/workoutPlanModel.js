import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { CREATE_WORKOUT_PLAN_SCHEMA, UPDATE_WORKOUT_PLAN } from '~/utils/schema';

const validateBeforeCreate = async (data) => {
  try {
    return await CREATE_WORKOUT_PLAN_SCHEMA.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new Error(`Validation Error: ${error.message}`);
  }
};

const validateBeforeUpdate = async (data) => {
  try {
    return await UPDATE_WORKOUT_PLAN.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new Error(`Validation Error: ${error.message}`);
  }
};

const getAll = async () => {
  try {
    const collection = await GET_DB().collection('workoutPlans');
    return await collection.find({}).toArray();
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
};

const getAllByUserId = async (userId) => {
  try {
    const collection = await GET_DB().collection('workoutPlans');
    return await collection.findOne({ userId: new ObjectId(userId) });
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
};

const findOne = async (id) => {
  try {
    const collection = await GET_DB().collection('workoutPlans');
    return await collection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
};

const create = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    if (validData.userId) {
      validData.userId = new ObjectId(validData.userId);
    }

    const collection = await GET_DB().collection('workoutPlans');
    return await collection.insertOne(validData);
  } catch (error) {
    throw new Error(`Create Error: ${error.message}`);
  }
};

const update = async (id, data) => {
  try {
    const validData = await validateBeforeUpdate(data);
    const collection = await GET_DB().collection('workoutPlans');
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: validData });
  } catch (error) {
    throw new Error(`Update Error: ${error.message}`);
  }
};

const updateByUserId = async (userId, data) => {
  try {
    const result = await GET_DB()
      .collection('workoutPlans')
      .findOneAndUpdate(
        { userId: new ObjectId(userId) },
        { $set: data },
        { returnDocument: 'after', upsert: true }
      );
    return result;
  } catch (error) {
    throw new Error(`Update Error: ${error.message}`);
  }
};

const remove = async (id) => {
  try {
    const collection = await GET_DB().collection('workoutPlans');
    return await collection.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(`Delete Error: ${error.message}`);
  }
};

export default {
  getAll,
  getAllByUserId,
  findOne,
  create,
  update,
  updateByUserId,
  remove
};
