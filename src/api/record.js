import axios from 'axios';

export const getRecords = async (token, filters, page, rowsPerPage, order, orderBy, user) => {
  try {
    const response = await axios.get('http://localhost:8006/records.php', {
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
      await axios.delete(`http://localhost:8006/records.php?id=${id}`, {
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
    const response = await axios.post('http://localhost:8006/records.php', recordData, {
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
