import botModel from '~/models/botModel';
import { StatusCodes } from 'http-status-codes';

const get = async (req, res) => {
  try {
    const data = await botModel.getAll();
    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { userId } = req.userId;
    const data = await botModel.getAllByUserId(userId);

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};


const post = async (req, res) => {
  try {
    const body =  req.body;
    const data = await botModel.create(body);

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};



const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await botModel.update(id, req.body);

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await botModel.remove(id);

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const botController = {
  get,
  post,
  update,
  remove
};

