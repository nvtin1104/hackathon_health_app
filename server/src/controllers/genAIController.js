import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import { userModal } from '~/models/userModel';
import workoutPlanModel from '~/models/workoutPlanModel';
import mealPlanModel from '~/models/mealPlanModel';
import { dailyActModel } from '~/models/dailyActModel';

const genGPTAIOverview = async (req, res) => {
  try {
    const user = await userModal.findOneByUserId(req.user._id);

    const { weight, height, age, gender, fitness, nutrition, sleep, water, goal } = user;

    let genderText;

    switch (gender) {

    case 1:
      genderText = 'man';
      break;
    case 2:
      genderText = 'woman';
      break;
    case 3:
      genderText = 'other';
      break;
    default:
      genderText = 'unknown';
      break;
    }

    const question = `I am ${age} years old and ${genderText}. I do practice ${fitness}. I am ${weight} kg, ${height} cm. I am ${nutrition} person. I am ${sleep} hour sleep. I have ${water}lit water each day. You are a healthcare professional.${goal ? `. My goal is ${goal}` : ''}. Please give me a report and training plan. 
    Returns a json string remove \`\`\`json at the beginning,  \`\`\` at the end and \n as
    {
      healthRate: number(10 score scale),
      comment: {
        overview: vietnamese string(Overview of health, BMI, fat or thin...),
        plan: vietnamese string(Plan, what should be done, what should be improved),
      }
    }`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const messageContent = response.data.choices[0].message.content;

    const data = JSON.parse(messageContent);

    await userModal.updateById(req.user._id, { ...data, updatedAt:  Date.now() });

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
  }
};

const genGPTAIMealPlan = async (req, res) => {
  try {
    const user = await userModal.findOneByUserId(req.user._id);

    const { weight, height, age, gender, fitness, nutrition, sleep, water, goal } = user;

    let genderText;

    switch (gender) {

    case 1:
      genderText = 'man';
      break;
    case 2:
      genderText = 'woman';
      break;
    case 3:
      genderText = 'other';
      break;
    default:
      genderText = 'unknown';
      break;
    }

    const question = `I am ${age} years old and ${genderText}. I do practice ${fitness}. I am ${weight} kg, ${height} cm. I am ${nutrition} person. I am ${sleep} hour sleep. I have ${water}lit water each day. You are a healthcare professional${goal ? `. My goal is ${goal}` : ''}. Please give me meal plan. Don't give dish. 
    Returns a json string remove \`\`\`json at the beginning,  \`\`\` at the end and \n as
    {
      breakfast: [
        {
          name: Vietnamese string(the name of the food, not the name of the dish),
          nutrition: Vietnamese string(nutrients contained in that food),
          qty: string (amount should be eaten at this meal)
          calories: number(The corresponding number of calories of this dish according to qty)
        },
        ...
      ],
      lunch: [
        {
          name: Vietnamese string(the name of the food, not the name of the dish),
          nutrition: Vietnamese string(nutrients contained in that food),
          qty: string (amount should be eaten at this meal)
          calories: number(The corresponding number of calories of this dish according to qty)
        },
        ...
      ],
      dinner: [
        {
          name: Vietnamese string(the name of the food, not the name of the dish),
          nutrition: Vietnamese string(nutrients contained in that food),
          qty: string (amount should be eaten at this meal)
          calories: number(The corresponding number of calories of this dish according to qty)
        },
        ...
      ]
    }`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 3896
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const messageContent = response.data.choices[0].message.content;
    const data = JSON.parse(messageContent);

    const result = await mealPlanModel.updateByUserId(req.user._id, { meals: data, updatedAt: Date.now() });

    if (!data) {
      return res.status(StatusCodes.OK).json({ success: false, msg: 'Không convert qua JSON được' });
    }

    return res.status(StatusCodes.OK).json({ success: true, data: result });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const genGPTAIWorkoutPlan = async (req, res) => {
  try {
    const user = await userModal.findOneByUserId(req.user._id);

    const { weight, height, age, gender, fitness, nutrition, sleep, water } = user;

    let genderText;

    switch (gender) {

    case 1:
      genderText = 'man';
      break;
    case 2:
      genderText = 'woman';
      break;
    case 3:
      genderText = 'other';
      break;
    default:
      genderText = 'unknown';
      break;
    }

    const question = `I am ${age} years old and ${genderText}. I do practice ${fitness}. I am ${weight} kg, ${height} cm. I am ${nutrition} person. I am ${sleep} hour sleep. I have ${water}lit water each day. You are a healthcare professional. Please give me training plan. 
    Returns a json string remove \`\`\`json at the beginning,  \`\`\` at the end and \n as
    {
      exercises: [
        {
          name: vietnamese string,
          time: vietnamese string (time(quantity) / minutes),
          note: vietnamese string (details how to perform the exercise, time, space, quantity, intensity, future intensity),
          practice: vietnamese string (detailed step by step to perform this exercise),
        },
        ...
      ]
    }`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 3896
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const messageContent = response.data.choices[0].message.content;
    const data = JSON.parse(messageContent);
    const result = await workoutPlanModel.updateByUserId(req.user._id, { exercises: data.exercises, updatedAt: Date.now() });

    return res.status(StatusCodes.OK).json({ success: true, data: result });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const genGPTAIDailyReport = async (req, res) => {
  try {
    const dailyActData = await dailyActModel.findOneByUserId(req.user._id);

    const question = `You are a healthcare professional. This is my today's activity data: ${JSON.stringify(dailyActData)}. Please give me a report.
    Returns a json string remove \`\`\`json at the beginning,  \`\`\` at the end and \n as
    {
      overview: vietnamese string,
      caloriesConsumed: number,
      caloriesBurned: number,
      improveTomorrow: vietnamese string
    }
    `;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 3896
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const messageContent = response.data.choices[0].message.content;
    const data = JSON.parse(messageContent);

    return res.status(StatusCodes.OK).json({ success: true, data });

  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const genAIController = {
  genGPTAIOverview,
  genGPTAIWorkoutPlan,
  genGPTAIMealPlan,
  genGPTAIDailyReport
}
