import { useMutation } from "@tanstack/react-query";
import api from "./axios";


export interface CohortCreationPayload{

  cohortName: string; 
  description: string;
  shortCode:string;
}
export interface CohortCreationResponse {
    message:string;
}

export const cohortCreationApi = async (payload: CohortCreationPayload): Promise<CohortCreationResponse> => {
  
  const { data } = await api.post<CohortCreationResponse>("/customer/addCohort", payload);
  return data;
};


export const createCohort = () =>
  useMutation({
    mutationFn: cohortCreationApi
  });