import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth/register.service";
import type { RegisterFormData } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useRegister = () => {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterFormData) => registerUser(userData),
    onSuccess: () => {
      // Registration successful, redirect to login or dashboard
      router.push("/auth/login?registered=success");
    },
    onError: (error: { errors?: Array<{ path: string; message: string }> }) => {
      if (error.errors) {
        // Transform validation errors into a more usable format
        const errorsMap: Record<string, string> = {};
        error.errors.forEach((err: { path: string; message: string }) => {
          errorsMap[err.path] = err.message;
        });
        setValidationErrors(errorsMap);
      }
    },
  });

  return {
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending,
    isError: registerMutation.isError,
    error: registerMutation.error,
    validationErrors,
    isSuccess: registerMutation.isSuccess,
  };
};
