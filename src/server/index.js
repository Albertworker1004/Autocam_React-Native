import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.1.87.173/Sift/API_AutoCam/index.php',
});

export default api;
