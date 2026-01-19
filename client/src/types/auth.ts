export interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role: "user" | "guide" | "lead-guide" | "admin";
  active?: boolean;
}

export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}

export interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}
