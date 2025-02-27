import type { RegisterFormData } from "@/types/auth.types";

export const registerUser = async (userData: RegisterFormData) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Kayıt işlemi başarısız oldu');
  }
  
  return data;
};