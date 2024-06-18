/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { userModal } from '~/models/userModel';
import { StatusCodes } from 'http-status-codes';
const getUserID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModal.getUserID(id);
    if (user) {
      return res.status(StatusCodes.OK).json({
        success: true,
        user,
      });
    }
    return res.status(StatusCodes.OK).json({ success: false });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json('Có lỗi xảy ra xin thử lại sau');
  }
};
const getUserEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userModal.getUserEmail(email);
    if (user) {
      return res.status(StatusCodes.OK).json({
        success: true,
        user,
      });
    }
    return res.status(StatusCodes.OK).json({ success: false });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json('Có lỗi xảy ra xin thử lại sau');
  }
};

const login = async (req, res) => {
  const { email, tokenGG } = req.body;
  if (!email || !tokenGG) {
    return res.status(StatusCodes.BAD_REQUEST).json('Không bỏ trống thông tin');
  }
  const user = await userModal.getUserEmail(email);
  if (!user) {
    const data = {
      email: email,
      tokenGG: tokenGG,
    };
    // chưa đăng nhập
    const dataUser = await userModal.login(data);
    if (dataUser.acknowledged) {
      return res.status(StatusCodes.OK).json({ success: true, first: data });
    }
    return res.status(StatusCodes.OK).json({ success: false });
  }
  const data = {
    email: email,
    tokenGG: tokenGG,
  };
  // Đã đăng nhập
  const dataUser = await userModal.updateLogin(data);
  const logins = await userModal.getUserEmail(email);
  if (dataUser.acknowledged) {
    return res.status(StatusCodes.OK).json({ success: true, logins });
  }
  return res.status(StatusCodes.OK).json({ success: false });
};

const updateData = async (req, res) => {
  const { email } = req.params;
  const {
    name,
    age,
    gender,
    height,
    weight,
    fitness,
    nutrition,
    exercise,
    heathRate,
    sleep,
    water,
    comment,
  } = req.body;
  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json('Không bỏ trống thông tin');
  }
  const user = await userModal.getUserEmail(email);
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json('Không tồn tại người dùng');
  }
  const data = {
    name: name || null,
    age: age || null,
    gender: gender || 3,
    height: height || null,
    weight: weight || null,
    fitness: fitness || null,
    nutrition: nutrition || null,
    exercise: exercise || null,
    heathRate: heathRate || null,
    sleep: sleep || null,
    water: water || null,
    comment: comment || null,
  };
  const dataUser = await userModal.updateData(email, data);
  if (dataUser.acknowledged) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, mgs: 'Cập nhật thông tin thành công' });
  }
  return res.status(StatusCodes.OK).json({ success: false });
};
export const usersController = {
  getUserID,
  getUserEmail,
  login,
  updateData,
};
