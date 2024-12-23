import { LoginCredentials } from "../types";
import api from "./axiosInstance";

const login = async (credentials: LoginCredentials) => {
  return api.post("/auth/login", credentials);
};

const self = async () => {
  return api.get("/auth/self");
};

const logout = async () => {
  return await api.get("/auth/logout");
};

const getUsers = async () => {
  return api.get("/users");
};

const getTenants = async () => {
  return api.get("/tenants");
};

export { login, self, logout, getUsers, getTenants };
