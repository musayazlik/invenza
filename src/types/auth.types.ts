export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
  error?: string;
  errors?: Array<{
    path: string;
    message: string;
  }>;
}