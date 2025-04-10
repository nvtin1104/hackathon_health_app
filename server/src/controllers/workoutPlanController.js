import workoutPlanModel from '~/models/workoutPlanModel';
import { StatusCodes } from 'http-status-codes';
import { dailyActApi } from './../routes/dailyActRouter';

const getAll = async (req, res) => {
  try {
    const data = await workoutPlanModel.getAll();
    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const getAllByUserId = async (req, res) => {
  try {
    const { _id } = req.user;
    const data = await workoutPlanModel.getAllByUserId(_id);

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await workoutPlanModel.findOne(id);

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
    }

    const data = await workoutPlanModel.create({ userId, ...req.body });

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
    const data = await workoutPlanModel.update(id, req.body);

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
    const data = await workoutPlanModel.remove(id);

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const workoutPlanController = {
  getAll,
  getAllByUserId,
  findOne,
  create,
  update,
  remove
};

