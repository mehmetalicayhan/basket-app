import axios from 'axios';

const API_URL = 'https://nonchalant-fang.glitch.me';

export default {
  getProducts() {
    return axios.get(`${API_URL}/listing`);
  },
  placeOrder(order) {
    return axios.post(`${API_URL}/order`, order);
  },
};
