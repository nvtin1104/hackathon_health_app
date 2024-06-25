import chatModel from '~/models/chatModel';
import { StatusCodes } from 'http-status-codes';

const get = async (req, res) => {
  try {
    const { botId } = req.params
    const { _id } = req.user;
    
    const conditions = {
      userId: _id,
      botId: botId
    }
    const data = await chatModel.getAll(conditions);
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
    const data = await chatModel.getAllByUserId(userId);

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
    const { _id } = req.user;
    const data = await chatModel.create({...body, userId: _id});

    return res.status(StatusCodes.OK).json({ success: true, message: 'tạo chat thành công', data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await chatModel.update(id, req.body);

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
    const data = await chatModel.remove(id);

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const chatController = {
  get,
  post,
  update,
  remove
};

