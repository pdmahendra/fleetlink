import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fleetlink.onrender.com/api/v1",
  // baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
