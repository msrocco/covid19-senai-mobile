import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-covid19-senai.herokuapp.com/',
});

export default api;