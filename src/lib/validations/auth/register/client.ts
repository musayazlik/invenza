import { z } from "zod";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "İsim en az 2 karakter olmalıdır" })
      .nonempty({ message: "İsim alanı zorunludur" }),
    email: z
      .string()
      .nonempty({ message: "E-posta alanı zorunludur" })
      .email({ message: "Geçerli bir e-posta adresi giriniz" }),
    password: z
      .string()
      .nonempty({ message: "Şifre alanı zorunludur" })
      .min(8, { message: "Şifre en az 8 karakter olmalıdır" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Şifre tekrar alanı zorunludur" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "Kullanım şartlarını kabul etmelisiniz",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export { formSchema };
export type { FormData };
