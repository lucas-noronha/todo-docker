import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default class ApiService {
  static async getCompleted() {
    try {
      const response = await api.get('/todo/completeds');
      console.log('API GET Completed Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API GET Completed Error:', error);
      throw error;
    }
  }
  static async get() {
    try {
      const response = await api.get('/todo');
      console.log('API GET Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }
  static async put(id){
    try {
      const response = await api.put('/todo/complete/' + id);
      return response.data;
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  }
  static async post(data) {
      const response = await api.post('/todo', data);
      try {
      return response.data;
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }
  static async delete(id){
    try {
      const response = await api.delete('/todo/' + id);
      return response.data;
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }
}