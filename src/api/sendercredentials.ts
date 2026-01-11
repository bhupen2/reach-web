import { useMutation } from "@tanstack/react-query";
import api from "./axios";


export interface SenderCredentialPayload {

  senderEmail: string; 
  password: string;
  smtpServer:string;
  port:string  ;
  
}
export interface SenderCredentialResponse {
    message:string;
    //insertedId: string;
}

export const senderCredentialApi = async (payload: SenderCredentialPayload): Promise<SenderCredentialResponse> => {
  // const data: SenderCredentialResponse = {
  //   message: "Successfuly added sender credential",
  //   insertedId: "123456"
  // }
  const { data } = await api.post<SenderCredentialResponse>("/addSenderEmailCredentials", payload);
  return data;
};


export const senderCredential = () =>
  useMutation({
    mutationFn: senderCredentialApi
  });