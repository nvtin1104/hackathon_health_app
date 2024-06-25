import chatModel from '~/models/chatModel'
import botModel from '~/models/botModel'
import { userModal } from '~/models/userModel';
import { StatusCodes } from 'http-status-codes'
import { getAnswerFromAI } from '~/utils/helper';

const get = async (req, res) => {
  try {
    const { botId } = req.params
    const { _id } = req.user

    const conditions = {
      userId: _id,
      botId: botId,
    }
    const data = await chatModel.getAll(conditions)
    return res.status(StatusCodes.OK).json({ success: true, data })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message })
  }
}

const getLatestChat = async (req, res) => {
  try {
    const { _id } = req.user

    const conditions = {
      userId: _id
    }
    const data = await chatModel.getLatestChat(conditions)
    return res.status(StatusCodes.OK).json({ success: true, data })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const { userId } = req.userId
    const data = await chatModel.getAllByUserId(userId)

    return res.status(StatusCodes.OK).json({ success: true, data })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message })
  }
}

const post = async (req, res) => {
  try {
    const body = req.body
    const { _id } = req.user
    const data = await chatModel.create({ ...body, userId: _id })

    return res.status(StatusCodes.OK).json({ success: true, message: 'tạo chat thành công', data })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message })
  }
}

const postAnswerAI = async (req, res) => {
  try {
    const { botId, message } = req.body
    const body = req.body
    const user = await userModal.findOneByUserId(req.user._id)

    const { weight, height, age, gender, fitness, nutrition, sleep, water, goal, _id } = user
    // handle case get prompt of bot
    const bot = await botModel.findById(botId)
    if (!bot) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Bot không tồn tại' })
    }
    const questionAI = `I am ${age} years old and ${gender}. I do practice ${fitness}. I am ${weight} kg, ${height} cm. I am ${nutrition} person. I am ${sleep} hour sleep. I have ${water}lit water each day. You are a healthcare professional${
      goal ? `. My goal is ${goal}` : ''
    }, system follow: ${bot.prompt} topic , answer question ${message} with vietnamese language as expert with heath`
    // send question to chat gpt
    const answer = await getAnswerFromAI(questionAI)
    if(!answer) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'gpt not work' })
    }
    console.log('call here', _id)
    const data = await chatModel.create({ ...body, userId: _id.toString(), isBot: true, message: answer })
    // save message
    // return message
    return res.status(StatusCodes.OK).json({ success: true, data })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const data = await chatModel.update(id, req.body)

    return res.status(StatusCodes.OK).json({ success: true, data })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message })
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params
    const data = await chatModel.remove(id)

    return res.status(StatusCodes.OK).json({ success: true, data })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message })
  }
}

export const chatController = {
  get,
  post,
  update,
  remove,
  postAnswerAI,
  getLatestChat
}
