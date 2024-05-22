import axios from 'axios';

const API_URL = 'https://api.zooxial.com';

export const getRecords = async (token, filters, page, rowsPerPage, order, orderBy, user) => {
  try {
    const response = await axios.get(`${API_URL}/records.php`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        filters,
        page,
        rowsPerPage,
        order,
        orderBy,
        user
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};

export const deleteRecord = async (token, id) => {
    try {
      await axios.delete(`${API_URL}/records.php?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
};

export const createRecord = async (token, recordData) => {
  try {
    const response = await axios.post(`${API_URL}/records.php`, recordData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
