import axios from 'axios';

const API_URL = 'https://api.zooxial.com';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/index?action=login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};
