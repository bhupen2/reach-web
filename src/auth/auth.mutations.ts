import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";

export const useLogin = () =>
  useMutation({
    mutationFn: loginApi
  });
