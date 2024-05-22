import axios from 'axios';

const API_URL = 'https://api.zooxial.com';

export const getOperations = async (token, filters, page, rowsPerPage, order, orderBy) => {
  try {
    const response = await axios.get(`${API_URL}/operations.php`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        filters,
        page,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        rowsPerPage,
        order,
        orderBy,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching operations:', error);
    throw error;
  }
};
