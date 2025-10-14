// src/api.js
import axios from "axios"; // automatically handles JSON conversion

// Create a preconfigured Axios instance for your API
const api = axios.create({
  baseURL: "http://localhost:9000", // your Node API base URL
  withCredentials: true,             //  send and receive cookies automatically
});

// Handle expired sessions or invalid tokens globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      console.warn("Session expired or unauthorized");
      // redirect or trigger logout logic 
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
