import axios from 'axios';

const API_URL = 'https://api.zooxial.com';

export const getUsers = async (token, filters, page, rowsPerPage, order, orderBy) => {
  try {
    const response = await axios.get(`${API_URL}/users.php`, {
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
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const deleteUser = async (token, id) => {
    try {
      await axios.delete(`${API_URL}/users.php?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
};


export const createUser = async (token, recordData) => {
    try {
      const response = await axios.post(`${API_URL}/users.php`, recordData, {
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

  export const getUserById = async (token, id) => {
    try {
        const response = await axios.get(`${API_URL}/users.php?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
  }

  export const updateUser = async (token, id, userData) => {
    try {
        const response = await axios.put(`${API_URL}/users.php?id=${id}`, userData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        throw error;
    }
  }