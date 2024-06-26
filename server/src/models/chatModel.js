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
    },
    {
      $sort: { createdAt: -1 } // Sort by createdAt in descending order
    }
  ]).toArray();
};

const getLatestChat = async (conditions) => {
  console.log(conditions);

  return await GET_DB().collection(COLLECTION).aggregate([
    {
      $match: {
        ...conditions,
        userId: new ObjectId(conditions.userId)
      }
    },
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
    },
    {
      $sort: { createdAt: -1 } // Sort by createdAt in descending order
    },
    {
      $group: {
        _id: "$botId",
        latestMessage: { $first: "$$ROOT" } // Get the first document in each group, which is the latest message due to the previous sort
      }
    },
    {
      $replaceRoot: { newRoot: "$latestMessage" } // Replace the root document with the latestMessage
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
  try {
    // Validate data before creation
    const validData = await validateBeforeCreate(data);

    // Get the database collection
    const db = await GET_DB();
    const collection = db.collection(COLLECTION);

    // Prepare data for insertion, converting necessary fields to ObjectId
    const insertData = {
      ...validData,
      userId: new ObjectId(validData.userId), 
      botId: new ObjectId(validData.botId),
    };

    // Insert the data into the collection
    const { insertedId } = await collection.insertOne(insertData);

    // Find and return the newly inserted document by its ID
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

const findById = async (id) => {
  const collection = await GET_DB().collection(COLLECTION);

  return await collection.findOne({ _id: new ObjectId(id) });
}

export default {
  getAll,
  getAllByUserId,
  findOne,
  create,
  update,
  remove,
  getLatestChat
}