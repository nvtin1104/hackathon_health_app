
import { StatusCodes } from 'http-status-codes';
import { bmiModel } from '~/models/bmiModel';
import mealPlanModel from '~/models/mealPlanModel';
import { userModal } from '~/models/userModel';


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


const create = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
    }
    const { height, weight } = req.body;
    const heightM = height / 100;
    let bmi = weight / (heightM * heightM);
    const evaluateBMI = (bmi) => {
      let evaluation = '';
      if (bmi < 18.5) {
        evaluation = 'Gầy';
      } else if (bmi >= 18.5 && bmi < 25) {
        evaluation = 'Bình thường';
      } else if (bmi >= 25 && bmi < 30) {
        evaluation = 'Thừa cân';
      } else {
        evaluation = 'Béo phì';
      }
      return evaluation;
    };

    // Sử dụng hàm evaluateBMI để đánh giá và làm tròn BMI
    bmi = bmi.toFixed(2);
    const bmiEvaluation = evaluateBMI(bmi);
    await userModal.update(userId, { height, weight });
    const data = await bmiModel.create({ userId, ...req.body, bmi, bmiEvaluation });

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const get7Time = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await bmiModel.get7Time(userId);
    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
}
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

export const bmiController = {
  getAllByUserId,
  create,
  remove,
  get7Time
};

