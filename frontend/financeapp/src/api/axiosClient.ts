import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'http://localhost:5054/api/',
    timeout: 5000,
    headers: {
        'Content-Type' : 'application/json'
    }
})

axiosClient.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized - redirecting to login');
        // Możesz dodać przekierowanie do strony logowania
      }
      return Promise.reject(error);
    }
);