import { useMutation } from "@tanstack/react-query";
import api from "./axios";


export interface UserAdditionPayload {

  name: string; 
  email: string;
  password:string;
  role:string  ;
  
}
export interface UserAdditionResponse {
    message:string;
    //insertedId: string;
}

export const userAdditionApi = async (payload: UserAdditionPayload): Promise<UserAdditionResponse> => {
  // const data: SenderCredentialResponse = {
  //   message: "Successfuly added sender credential",
  //   insertedId: "123456"
  // }
  const { data } = await api.post<UserAdditionResponse>("/auth/register", payload);
  return data;
};


export const userAddition = () =>
  useMutation({
    mutationFn: userAdditionApi
  });