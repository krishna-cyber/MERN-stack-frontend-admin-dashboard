interface LoginCredentials {
  email: string;
  password: string;
}

interface Tenant {
  _id: string;
  name: string;
  address: string;
}

export type { LoginCredentials, Tenant };
