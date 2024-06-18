/* eslint-disable semi */
import { userModal } from '~/models/userModel';
import { StatusCodes } from 'http-status-codes';
const getUser = async (req, res) => {
  const dataUser = await userModal.test1();
  return res.status(StatusCodes.OK).json({
    dataUser,
  });
};
const add = async (req, res) => {
  const data = {
    title: 'Post Title 1',
    body: 'Body of post.',
    category: 'News',
    likes: 1,
    date: Date(),
  };
  const dataUser = await userModal.add(data);
  return res.status(StatusCodes.OK).json({
    dataUser,
  });
};
export const usersController = {
  getUser,
  add,
};
