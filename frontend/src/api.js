import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend URL if different
});

export const registerUser = (username, password) =>
  api.post("/auth/register", { username, password });

export const loginUser = (username, password) =>
  api.post("/auth/login", { username, password });

export const fetchMessages = (token) =>
  api.get("/messages", { headers: { Authorization: token } });

export const sendMessage = (text, token) =>
  api.post("/messages", { text }, { headers: { Authorization: token } });

export const deleteMessage = (id, token) =>
  api.delete(`/messages/${id}`, { headers: { Authorization: token } });

export default api;
