import axios from 'axios';

let AxiosConfig = axios.create({
  baseURL: 'http://localhost:5234/api',
  headers: { 'Content-Type': 'application/json' }
});

export default AxiosConfig;
