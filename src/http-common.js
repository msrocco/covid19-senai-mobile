import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-covid19-senai.herokuapp.com/api',
  headers: {
    "Content-type": "application/json"
  }
});

export default api;