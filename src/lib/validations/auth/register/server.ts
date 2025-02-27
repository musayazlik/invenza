import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  password: z
    .string()
    .min(8, { message: "Şifre en az 8 karakter olmalıdır" })
    .regex(/[a-z]/, { message: "Şifre en az bir küçük harf içermelidir" })
    .regex(/[A-Z]/, { message: "Şifre en az bir büyük harf içermelidir" })
    .regex(/[0-9]/, { message: "Şifre en az bir rakam içermelidir" }),
});

export { registerSchema };
