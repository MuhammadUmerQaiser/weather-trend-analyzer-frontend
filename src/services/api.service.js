/* eslint-disable no-useless-constructor */
import axios from "axios";

export class ApiService {
  constructor() {}

  async getData(endpoint) {
    try {
      const response = await axios.get(endpoint);
      return response;
    } catch (err) {
      return err;
    }
  }
  async postData(endpoint, data) {
    try {
      const response = await axios.post(endpoint, data);
      return response;
    } catch (err) {
      return err;
    }
  }
  async deleteData(endpoint, id) {
    try {
      const response = await axios.delete(endpoint);
      return response;
    } catch (err) {
      return err;
    }
  }
  async putData(endpoint, data) {
    try {
      const response = await axios.put(endpoint, data);
      return response;
    } catch (err) {
      return err;
    }
  }
}
