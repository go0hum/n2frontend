import axios from 'axios';
import { BASE_URL } from '../config';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/index?action=login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};
