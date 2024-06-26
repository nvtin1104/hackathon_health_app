import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { CREATE_BMI_SCHEMA } from '~/utils/schema';

const validateBeforeCreate = async (data) => {
  try {
    return await CREATE_BMI_SCHEMA.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new Error(`Validation Error: ${error.message}`);
  }
};

const getAllByUserId = async (userId) => {
  try {
    const collection = await GET_DB().collection('mealPlans');
    return await collection.find({ userId: new ObjectId(userId) }).toArray();
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
};

const get7Time = async (userId) => {
  try {
    const collection = await GET_DB().collection('bmi');
    return await collection.find({ userId: new ObjectId(userId) }).sort({ createdAt: -1 }).limit(7).toArray();
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
}
const create = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    if (validData.userId) {
      validData.userId = new ObjectId(validData.userId);
    }

    const collection = await GET_DB().collection('bmi');
    const result = await collection.insertOne(validData);
    return await collection.findOne({ _id: result.insertedId });
  } catch (error) {
    throw new Error(`Create Error: ${error.message}`);
  }
};


const updateByUserId = async (userId, data) => {
  try {
    const result = await GET_DB()
      .collection('mealPlans')
      .findOneAndUpdate(
        { userId: new ObjectId(userId) },
        { $set: data },
        { returnDocument: 'after' }
      );
    return result;
  } catch (error) {
    throw new Error(`Update Error: ${error.message}`);
  }
};

const remove = async (id) => {
  try {
    const collection = await GET_DB().collection('mealPlans');
    return await collection.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(`Delete Error: ${error.message}`);
  }
};

export const bmiModel = {
  getAllByUserId,
  create,
  updateByUserId,
  remove,
  get7Time
};
