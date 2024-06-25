import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { CREATE_MESSAGE_SCHEMA, UPDATE_MESSAGE_SCHEMA } from '~/utils/schema';

const validateBeforeCreate = async (data) => {
  return await CREATE_MESSAGE_SCHEMA.validateAsync(data, { abortEarly: false });
}

const validateBeforeUpdate = async (data) => {
  return await UPDATE_MESSAGE_SCHEMA.validateAsync(data, { abortEarly: false });
}

const COLLECTION = "messages";
const getAll = async(conditions) => {
  console.log(conditions)
  return await GET_DB().collection(COLLECTION).aggregate([
    { $match: {
      ...conditions,
      botId: new ObjectId(conditions.botId),
      userId: new ObjectId(conditions.userId)
    } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $lookup: {
        from: 'bots',
        localField: 'botId',
        foreignField: '_id',
        as: 'bot'
      }
    }
  ]).toArray();
};

const getAllByUserId = async (userId) => {
  const collection = await GET_DB().collection(COLLECTION);

  return await collection.find({ userId: userId }).toArray();
}

const findOne = async (id) => {
  const collection = await GET_DB().collection(COLLECTION);

  return await collection.findOne({ _id: new ObjectId(id) });
}

const create = async (data) => {
  const validData = await validateBeforeCreate(data);
  const collection = await GET_DB().collection(COLLECTION);
  const insertData = {
    ...validData,
    userId: new ObjectId(validData.userId), 
    botId: new ObjectId(validData.botId), 
  }
  return await collection.insertOne(insertData);
}

const update = async (id, data) => {
  const validData = await validateBeforeUpdate(data);
  const collection = await GET_DB().collection(COLLECTION);

  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: validData });
}

const remove = async (id) => {
  const collection = await GET_DB().collection(COLLECTION);
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