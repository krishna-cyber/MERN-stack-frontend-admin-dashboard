import { UploadFile } from "antd";

interface LoginCredentials {
  email: string;
  password: string;
}

interface Tenant {
  _id: string;
  name: string;
  address: string;
}

interface CreateUserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  tenatId?: string;
}

interface FieldData {
  name: string[];
  value?: string;
}

interface TenantCreateInfo {
  name: string;
  address: string;
}

interface AttributeSchema {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  avilableOptions: string[];
}

interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    avilableOptions: string[];
  };
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: AttributeSchema[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  categoryId: string;
  description: string;
  images: UploadFile[];
  priceConfiguration: string;
  attributes: string;
  isPublish: boolean;
  tenantId: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string[];
  tenantId: string;
  category: string;
  isPublish: boolean;
  createdAt: string;
}

export type {
  LoginCredentials,
  Tenant,
  CreateUserType,
  FieldData,
  TenantCreateInfo,
};
