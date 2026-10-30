import apiClient from "./apiClient";

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

const register = async (data: RegisterData) => {
  const response = await apiClient.post('/auth/register/', data);
  return response.data;
};

const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login/', data);
  return response.data;
};

const logout = async (refresh: string) => {
  await apiClient.post('/auth/logout/', { refresh });
};

export default {
  register,
  login,
  logout,
};