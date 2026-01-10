import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  role: "ADMIN" | "MANAGER" | "USER";
}

export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  // const data: LoginResponse = {
  //   accessToken: "gijijgjp_87598hkjgjkg",
  //   role: "ADMIN"
  // }
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
};
