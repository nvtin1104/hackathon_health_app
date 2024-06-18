/* eslint-disable no-unused-vars */
/* eslint-disable semi */
import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
const test1 = async () => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const dataUser = await collection.find();
    return dataUser;
  } catch (error) {
    throw new Error(error);
  }
};
const add = async (dataUser) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const result = await collection.insertOne(dataUser);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const userModal = {
  test1,
  add,
};
