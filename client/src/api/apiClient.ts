import axios from "axios";

const API_URL = 'http://localhost:3003'; 

export const apiClient = axios.create({
  baseURL: API_URL,
});
