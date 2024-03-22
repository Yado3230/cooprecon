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
  createdAt: string;
  lastLogin: string;
  userStatus: string;
  enabled: boolean;
  roleName: string;
  additionalAuthorities: any[];
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
