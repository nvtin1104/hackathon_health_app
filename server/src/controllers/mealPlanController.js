
import { StatusCodes } from 'http-status-codes';
import mealPlanModel from '~/models/mealPlanModel';

const getAll = async (req, res) => {
  try {
    const data = await mealPlanModel.getAll();
    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const getAllByUserId = async (req, res) => {
  try {
    const { userId } = req.user._id;
    const data = await mealPlanModel.getAllByUserId(userId);

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
    const data = await mealPlanModel.findOne(id);

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

    const data = await mealPlanModel.create({ userId, ...req.body });

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
    const data = await mealPlanModel.update(id, req.body);

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
    const data = await mealPlanModel.remove(id);

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

