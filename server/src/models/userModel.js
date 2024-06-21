/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { SAVE_USER_SCHEMA, UPDATE_USER } from '~/utils/schema';

const validateBeforeCreate = async (data) => {
  return await SAVE_USER_SCHEMA.validateAsync(data, { abortEarly: false });
};

const login = async (dataUser) => {
  try {
    const validData = await validateBeforeCreate(dataUser);
    const db = await GET_DB();
    const collection = db.collection('users');
    const result = await collection.insertOne(validData);
    return result;
  } catch (error) {
    if (error.details) {
      let e = [];
      error.details.map((mgs) => e.push(mgs.message));
      return {
        success: false,
        mgs: e,
      };
    }
    return {
      success: false,
      mgs: 'Có lỗi xảy ra xin thử lại sau',
    };
  }
};
const updateLogin = async (dataUser) => {
  try {
    const validData = await validateBeforeCreate(dataUser);
    const db = await GET_DB();
    const collection = db.collection('users');
    const result = await collection.updateOne(
      { email: validData.email },
      { $set: { tokenGG: validData.tokenGG } }
    );
    return result;
  } catch (error) {
    if (error.details) {
      let e = [];
      error.details.map((mgs) => e.push(mgs.message));
      return {
        success: false,
        mgs: e,
      };
    }
    return {
      success: false,
      mgs: 'Có lỗi xảy ra xin thử lại sau',
    };
  }
};

const getUserEmail = async (email) => {
  const db = await GET_DB();
  const collection = db.collection('users');
  const user = await collection.findOne({ email: email });
  return user;
};
const getUserID = async (id) => {
  const db = await GET_DB();
  const collection = db.collection('users');
  const user = await collection.findOne({ _id: new ObjectId(id) });
  return user;
};
const validateBeforeUpdate = async (data) => {
  return await UPDATE_USER.validateAsync(data, { abortEarly: false });
};
const updateData = async (email, dataUser) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    let updateFields = {};
    Object.keys(dataUser).forEach((key) => {
      if (dataUser[key] !== null && dataUser[key] !== undefined) {
        updateFields[key] = dataUser[key];
      }
    });
    await validateBeforeUpdate(updateFields);
    const result = await collection.updateOne(
      { email: email },
      { $set: updateFields }
    );
    return result;
  } catch (error) {
    if (error.details) {
      let e = [];
      error.details.map((mgs) => e.push(mgs.message));
      return {
        success: false,
        mgs: e,
      };
    }
    return {
      success: false,
      mgs: 'Có lỗi xảy ra xin thử lại sau',
    };
  }
};
export const userModal = {
  login,
  updateLogin,
  getUserEmail,
  getUserID,
  updateData,
};
