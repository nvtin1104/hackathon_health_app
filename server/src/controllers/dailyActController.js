import { StatusCodes } from 'http-status-codes';
import { dailyActModel } from '~/models/dailyActModel';

const getByUserId = async (userId) => {
  try {
    return await dailyActModel.getByUserId(userId);
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
};

const create = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
    }

    const data = await dailyActModel.create({ userId, ...req.body });

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
    const data = await dailyActModel.update(id, req.body);

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const dailyActController = {
  getByUserId,
  create,
  update,
}