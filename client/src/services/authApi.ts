import axiosInstance from "./axiosInstance";
import type {
  AuthResponse,
  LoginCredentials,
  SignupData,
  UpdatePasswordData,
  User,
} from "@/types/auth";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      "/users/login",
      credentials,
    );
    return response.data;
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      "/users/signup",
      data,
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.get("/users/logout");
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<{ data: { data: User } }>(
      "/users/me",
    );
    return response.data.data.data;
  },

  updatePassword: async (data: UpdatePasswordData): Promise<AuthResponse> => {
    const response = await axiosInstance.patch<AuthResponse>(
      "/users/updateMyPassword",
      data,
    );
    return response.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>(
      "/users/forgotPassword",
      { email },
    );
    return response.data;
  },

  resetPassword: async (
    token: string,
    password: string,
    passwordConfirm: string,
  ): Promise<AuthResponse> => {
    const response = await axiosInstance.patch<AuthResponse>(
      `/users/resetPassword/${token}`,
      { password, passwordConfirm },
    );
    return response.data;
  },

  verifyAuth: async (): Promise<User | null> => {
    try {
      const response = await axiosInstance.get<{ data: { user: User } }>(
        "/users/me",
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  },
};
