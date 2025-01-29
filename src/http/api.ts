import { GATEWAY } from "../constants/constant";
import {
  CreateUserType,
  LoginCredentials,
  ProductFormData,
  TenantCreateInfo,
} from "../types";
import api from "./axiosInstance";

const login = async (credentials: LoginCredentials) =>
  api.post(`${GATEWAY.AUTH_SERVICE}/auth/login`, credentials);

const self = async () => api.get(`${GATEWAY.AUTH_SERVICE}/auth/self`);

const logout = async () => await api.get(`${GATEWAY.AUTH_SERVICE}/auth/logout`);

const getUsers = async (queryString: string) =>
  api.get(`${GATEWAY.AUTH_SERVICE}/users?${queryString}`);

const getTenants = async (queryString: string) =>
  api.get(`${GATEWAY.AUTH_SERVICE}/tenants?${queryString}`);

const getTenantsList = async () =>
  api.get(`${GATEWAY.AUTH_SERVICE}/tenants/lists`);

const updateUser = async (id: string, data: CreateUserType) =>
  api.patch(`${GATEWAY.AUTH_SERVICE}/users/${id}`, data);

const createUser = async (data: CreateUserType) =>
  api.post(`${GATEWAY.AUTH_SERVICE}/users`, data);

const createResturant = async (data: TenantCreateInfo) =>
  await api.post(`${GATEWAY.AUTH_SERVICE}/tenants`, data);

// Category service
const getCategoryList = async () =>
  api.get(`${GATEWAY.CATALOG_SERVICE}/category`);

const getSingleCategoryById = async (categoryId: string) =>
  api.get(`${GATEWAY.CATALOG_SERVICE}/category/${categoryId}`);

const createProduct = async (data: ProductFormData) => {
  JSON.stringify(data);
  return api.post(`${GATEWAY.CATALOG_SERVICE}/product`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
  getCategoryList,
  getSingleCategoryById,
  createProduct,
};
