import axios from 'axios';
import cron from 'node-cron';
import { userModal } from '~/models/userModel';

const sendNotificationExpo = async (token, message) => {
  try {
    const response = await axios.post('https://exp.host/--/api/v2/push/send', {
      to: token,
      sound: 'default',
      title: 'Your Notification Title',
      body: message,
    }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    if (data.errors) {
      console.error('Failed to send notification:', data.errors);
    } else {
      console.log('Notification sent successfully:', data.data);
    }
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
  
  
const taskNotification = async () => {
    try {
        const users = await userModal.getAllUsers({enableNotification: true});
        for (const user of users) {
          if (user.notificationToken) {
            await sendNotificationExpo(user.notificationToken, 'Mở app và tập luyện nào');
          }
        }
      } catch (error) {
        console.error('Error fetching users or sending notifications:', error);
      }
};

const cronJob = () => {
  // Schedule a cron job to run every 5 minutes
  cron.schedule('* */1 * * *', async () => {
    console.log('Running a task every 5 minutes');
    await taskNotification();
  });
};

export default cronJob;
