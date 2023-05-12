import axios from 'axios'

const baseURL = 'http://localhost:6010';


const baseAPI = axios.create({
  baseURL: baseURL,
});

export default {
  baseAPI,
};