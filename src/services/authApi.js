import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_AUTH_API_URL || "http://localhost:3001"
).replace(/\/+$/, "");
const API = `${API_BASE_URL}/users`;

export const getUsersByEmail = (email) =>
  axios.get(API, { params: { email } });

export const getUsersByUsername = (username) =>
  axios.get(API, { params: { username } });

export const getUserById = (id) => axios.get(`${API}/${id}`);

export const createUser = (userData) => axios.post(API, userData);