import axios from 'axios';
// Base URL for the API
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://climbing-grouper-mildly.ngrok-free.app';
// Create an instance of axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 180000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getToken = async () => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdhMjJmMzhmN2ViNWYwODhkYzFlZGEiLCJlbWFpbCI6InRhYmxldGtpbmRmaXJlQGdtYWlsLmNvbSIsImlhdCI6MTcxOTI4MDU2NiwiZXhwIjoxNzIxODcyNTY2fQ.vOpcauPMidEW3L1bE2wa7Lvsbx_BZG-vTtd8zc2UwTI`
  return token;
};

// define const API

export const CREATE_CHAT = '/api/chat/message'
export const GET_CHAT_HISTORY = '/api/chat'
export const CREATE_BOT_ANSWER = '/api/chat/answer'


export default apiClient