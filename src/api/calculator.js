import axios from 'axios';
import { BASE_URL } from '../config';

export const performOperation = async (token, operation, number1 = null, number2 = null) => {
  const data = {};

  if (operation !== 'random_string') {
    if (operation === 'square_root') {
      data.a = number1;
    } else {
      data.a = number1;
      data.b = number2;
    }
  }

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/index.php?action=${operation}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
