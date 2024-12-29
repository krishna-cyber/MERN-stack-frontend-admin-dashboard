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

export type { LoginCredentials, Tenant, CreateUserType, FieldData };
