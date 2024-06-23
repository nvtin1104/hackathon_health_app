/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
import { GET_DB } from '~/config/mongodb';
import { ObjectId } from 'mongodb';
import { SAVE_USER_SCHEMA, UPDATE_USER } from '~/utils/schema';

const validateBeforeCreate = async (data) => {
  return await SAVE_USER_SCHEMA.validateAsync(data, { abortEarly: false });
};

const register = async (dataUser) => {
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
      { $set: { token: validData.token } }
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

const update = async (id, dataUser) => {
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
      { _id: new ObjectId(id) },
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

const updateById = async (id, data) => {
  try {
    const result = await GET_DB()
      .collection('users')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
      );

    delete result.tokenGG;

    return result;
  } catch (error) {
    return {
      success: false,
      mgs: 'Có lỗi xảy ra xin thử lại sau',
    };
  }
};
    
const changePassWord = async (id, password) => {
  try {
    const db = await GET_DB();
    const collection = db.collection('users');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { password: password } }
    );
    return result;
  } catch (error) {
    return {
      success: false,
      mgs: 'Có lỗi xảy ra xin thử lại sau',
    };
  }
};

const findOneByUserId = async (userId) => {
  try {
    const collection = await GET_DB().collection('users');

    return await collection.findOne({ _id: new ObjectId(userId) });
  } catch (error) {
    return {
      success: false,
      mgs: 'Có lỗi xảy ra xin thử được sau',
    }
  }
};

export const userModal = {
  register,
  updateLogin,
  getUserEmail,
  getUserID,
  updateData,
  updateById,
  findOneByUserId
  update,
  changePassWord,
};
