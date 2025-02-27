import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "E-posta alanı zorunludur" })
    .email({ message: "Geçerli bir e-posta adresi giriniz" }),
  password: z.string().nonempty({ message: "Şifre alanı zorunludur" }),
  remember: z.boolean().optional().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export { loginSchema };
export type { LoginFormData };
