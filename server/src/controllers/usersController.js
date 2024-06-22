/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { userModal } from '~/models/userModel';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '~/config/environment';

const getU = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await userModal.getUserID(_id);
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

const register = async (req, res) => {
  const { email, name = 'user', password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: 'Không bỏ trống thông tin' });
  }
  const user = await userModal.getUserEmail(email);
  if (user) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, msg: 'Tài khoản đã tồn tại' });
  }

  const hash = await bcrypt.hashSync(password, 8);
  if (!hash) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, msg: 'Có lỗi bảo mật xảy ra' });
  }
  const data = {
    email: email,
    name: name,
    password: hash,
  };
  const dataUser = await userModal.register(data);
  if (dataUser.acknowledged) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, msg: 'Đăng kí thành công' });
  }
  return res
    .status(StatusCodes.OK)
    .json({ success: false, msg: 'Đăng kí thất bại' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, mgs: 'Không bỏ trống thông tin' });
  }
  const user = await userModal.getUserEmail(email);
  if (!user) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, msg: 'Sai tài khoản hoặc mật khẩu' });
  }
  const checkPass = await bcrypt.compare(password, user.password);
  if (!checkPass) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, msg: 'Sai tài khoản hoặc mật khẩu' });
  }
  // Token
  const dataToken = {
    _id: user._id,
    email: user.email,
  };
  // 30 ngày
  const time = 60 * 60 * 24 * 30;
  const token = jwt.sign(dataToken, env.SECRET, { expiresIn: time });

  const data = {
    email: email,
    password: password,
    token: token,
  };
  // Đã đăng nhập
  const dataUser = await userModal.updateLogin(data);
  const userData = await userModal.getUserEmail(email);
  if (dataUser.acknowledged) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, mgs: 'Đăng nhập thành công', userData });
  }
  return res
    .status(StatusCodes.OK)
    .json({ success: false, mgs: 'Lỗi đăng nhập' });
};

const updateByEmail = async (req, res) => {
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
  return res.status(StatusCodes.OK).json(dataUser);
};

const update = async (req, res) => {
  const { _id } = req.user;
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
  if (!_id) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, mgs: 'Không bỏ trống thông tin' });
  }
  const user = await userModal.getUserID(_id);
  if (!user) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, mgs: 'Không tồn tại người dùng' });
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
  const dataUser = await userModal.update(_id, data);
  if (dataUser.acknowledged) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, mgs: 'Cập nhật thông tin thành công' });
  }
  return res.status(StatusCodes.OK).json(dataUser);
};

const changePassWord = async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  if (!_id || !password) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, mgs: 'Không bỏ trống thông tin' });
  }
  const user = await userModal.getUserID(_id);
  if (!user) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, mgs: 'Không tồn tại người dùng' });
  }
  const hash = await bcrypt.hashSync(password, 8);
  if (!hash) {
    return res
      .status(StatusCodes.OK)
      .json({ success: false, msg: 'Có lỗi bảo mật xảy ra' });
  }
  const dataUser = await userModal.changePassWord(_id, hash);
  if (dataUser.acknowledged) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, mgs: 'Đổi mật khẩu thành công' });
  }
  return res
    .status(StatusCodes.OK)
    .json({ success: false, msg: 'Có lỗi xảy ra xin thử lại sau' });
};

const test = async (req, res) => {
  const { _id, email } = req.user;
  return res.status(StatusCodes.OK).json({ success: true, msg: _id, email });
};

export const usersController = {
  getUserID,
  getUserEmail,
  login,
  updateByEmail,
  update,
  register,
  changePassWord,
  test,
  getU,
};
