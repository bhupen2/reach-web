import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token:string;
  user:{
    created_at:string;
    email:string;
    id:string;
    name:string;
    role:"ADMIN" | "MANAGER" | "USER";
    updated_at:string
  }
   
}

export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  // const data: LoginResponse = {
  //   accessToken: "gijijgjp_87598hkjgjkg",
  //   role: "ADMIN"
  // }
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
};
