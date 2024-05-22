import axios from 'axios';

export const getOperations = async (token, filters, page, rowsPerPage, order, orderBy) => {
  try {
    const response = await axios.get('http://localhost:8006/operations.php', {
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
