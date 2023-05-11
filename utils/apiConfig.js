import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_NODE_ENV === 'production'
  ? 'https://simple-blogging-platform-server.onrender.com'
  : 'http://localhost:6010';


const baseAPI = axios.create({
  baseURL: baseURL,
});

export default {
  baseAPI,
};