import axios from 'axios';
import config from '../../config';

// Create axios instance for requests without tokens
const axiosNoToken = axios.create({
  baseURL: config.fetching.base,
});

export default axiosNoToken;
