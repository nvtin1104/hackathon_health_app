import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { CREATE_DAILY_ACT_SCHEMA } from '~/utils/schema';

const validateBeforeCreate = async (data) => {
  try {
    return await CREATE_DAILY_ACT_SCHEMA.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new Error(`Validation Error: ${error.message}`);
  }
};

const findOneByUserId = async (userId) => {
  try {
    const collection = await GET_DB().collection('dailyActivities');
    return await collection.findOne({ userId: new ObjectId(userId) });
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

    const collection = await GET_DB().collection('dailyActivities');
    return await collection.insertOne(validData);
  } catch (error) {
    throw new Error(`Create Error: ${error.message}`);
  }
};

const update = async (id, data) => {
  try {
    const collection = await GET_DB().collection('dailyActivities');
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  } catch (error) {
    throw new Error(`Update Error: ${error.message}`);
  }
};

const updateByUserId = async (userId, data) => {
  try {
    const result = await GET_DB()
      .collection('dailyActivities')
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

export const dailyActModel = {
  findOneByUserId,
  create,
  update,
  updateByUserId,
}
