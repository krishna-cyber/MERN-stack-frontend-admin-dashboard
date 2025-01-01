import { CreateUserType, LoginCredentials, TenantCreateInfo } from "../types";
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

const getUsers = async (queryString: string) => {
  return api.get(`/users?${queryString}`);
};

const getTenants = async (queryString: string) => {
  return api.get(`/tenants?${queryString}`);
};

const getTenantsList = async () => {
  return api.get("/tenants/lists");
};

const updateUser = async (id: string, data: CreateUserType) => {
  return api.patch(`/users/${id}`, data);
};

const createUser = async (data: CreateUserType) => {
  return api.post("/users", data);
};

const createResturant = async (data: TenantCreateInfo) => {
  return await api.post("/tenants", data);
};
export {
  login,
  self,
  logout,
  getUsers,
  getTenants,
  updateUser,
  createUser,
  createResturant,
  getTenantsList,
};
