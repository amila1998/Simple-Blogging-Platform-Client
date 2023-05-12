import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_PRODUCTION_SERVER_URL
  : process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER_URL;


const baseAPI = axios.create({
  baseURL: baseURL,
});

export default {
  baseAPI,
};