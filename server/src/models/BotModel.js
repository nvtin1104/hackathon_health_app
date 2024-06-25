import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { CREATE_BOT_SCHEMA, UPDATE_WORKOUT_PLAN } from '~/utils/schema';

const validateBeforeCreate = async (data) => {
  return await CREATE_BOT_SCHEMA.validateAsync(data, { abortEarly: false });
}

const validateBeforeUpdate = async (data) => {
  return await CREATE_BOT_SCHEMA.validateAsync(data, { abortEarly: false });
}

const COLLECTION = "bots"
const getAll = async() => {
  const collection = await GET_DB().collection(COLLECTION);

  return await collection.find({}).toArray();
};

const getAllByUserId = async (userId) => {
  const collection = await GET_DB().collection(COLLECTION);

  return await collection.find({ userId: userId }).toArray();
}

const findById = async (id) => {
  const collection = await GET_DB().collection(COLLECTION);

  return await collection.findOne({ _id: new ObjectId(id) });
}

const create = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    
    const db = await GET_DB();
    const collection = db.collection(COLLECTION);
    
    const { insertedId } = await collection.insertOne(validData);
    
    return await findById(insertedId);
  } catch (error) {
    console.error('Error creating document:', error);
    throw new Error('Failed to create document');
  }
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
  findById,
  create,
  update,
  remove
}