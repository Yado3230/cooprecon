export interface UserRequest {
  roleId: number | string;
  fullName: string;
  email: string;
  password: string;
}

export interface UserResponse {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  status: string;
  lastLoggedIn: Date;
  registeredAt: Date;
  registeredBy: string;
  updatedAt: Date;
}

export interface EditUserRequest {
  email: string;
  phoneNumber: string;
  fullName: string;
  username: string;
}

export interface Role {
  id: number;
  roleName: string;
  description: string;
  authorities: string[] | [];
}

export interface Login {
  username: string;
  password: string;
}

export interface HeaderTemplate {
  id: number;
  templateName: string;
  headers: string[];
  rrn: string;
  status: string;
  client: {
    id: number;
    clientName: string;
    description: string;
    logo: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface HeaderTemplateRequest {
  fileTemplates: Template[];
  clientId: 0;
}

export interface Template {
  templateName: string;
  headers: string[];
  rrn: string;
}

export interface Client {
  id: number;
  clientName: string;
  description: string;
  logo: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
