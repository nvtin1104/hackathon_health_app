import apiClient, { UPDATE_USER_NOTIFICATION } from './setting'


export const updateNotification = async (payload) => {
  try {
    const response = await apiClient.put(UPDATE_USER_NOTIFICATION, payload)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response ? error.response.data.msg : error.message)
  }
}
