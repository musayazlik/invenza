"use client";
import Link from "next/link";
import { MotionDiv, MotionP } from "@/lib/motion";
import { staggerContainer, formItemVariant } from "@/lib/motion";
import { User, Mail, Lock, Loader } from "lucide-react";
import { useRegister } from "@/hooks/auth/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Shadcn UI bileşenleri
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form Validation

import { formSchema, FormData } from "@/lib/validations/auth/register/client";

const FormCard = () => {
  const { register: registerUser, isLoading } = useRegister();

  // Form tanımlama
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    registerUser(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success(
            "Kayıt başarıyla tamamlandı! Giriş sayfasına yönlendiriliyorsunuz."
          );
        },
        onError: (error: Error | unknown) => {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Kayıt işlemi başarısız oldu";
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <MotionDiv initial="hidden" animate="visible" variants={staggerContainer}>
      <Card className="w-full shadow-lg border-0 shadow-zinc-200">
        <CardHeader className="space-y-1">
          <MotionDiv variants={formItemVariant}>
            <CardTitle className="text-3xl font-bold text-center">
              Hesap Oluştur
            </CardTitle>
            <CardDescription className="text-center text-gray-600 mt-2">
              Invenza Otel Stok Yönetim sistemine kayıt olun.
            </CardDescription>
          </MotionDiv>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <MotionDiv className="space-y-4" variants={formItemVariant}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <User size={18} />
                          </div>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Adınız Soyadınız"
                            className="pl-12 py-6 text-base"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail size={18} />
                          </div>
                          <Input
                            {...field}
                            type="email"
                            placeholder="E-posta Adresiniz"
                            className="pl-12 py-6 text-base"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock size={18} />
                          </div>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Şifreniz"
                            className="pl-12 py-6 text-base"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock size={18} />
                          </div>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Şifrenizi Tekrar Girin"
                            className="pl-12 py-6 text-base"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </MotionDiv>

              <MotionDiv
                className="flex items-center space-x-2"
                variants={formItemVariant}
              >
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start space-x-3 gap-2 space-y-0">
                      <div className="flex gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 mt-0.5 leading-none">
                          <FormLabel className="text-sm  text-gray-600">
                            <span>
                              <Link
                                href="/terms"
                                className="text-primary hover:underline"
                              >
                                Kullanım Şartları
                              </Link>{" "}
                              ve{" "}
                              <Link
                                href="/privacy"
                                className="text-primary hover:underline"
                              >
                                Gizlilik Politikası
                              </Link>
                              nı kabul ediyorum.
                            </span>
                          </FormLabel>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </MotionDiv>

              <MotionDiv variants={formItemVariant}>
                <Button
                  type="submit"
                  variant="default"
                  className="w-full py-6 text-base font-medium"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      Yükleniyor...
                    </>
                  ) : (
                    "Kayıt Ol"
                  )}
                </Button>
              </MotionDiv>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <MotionP
            className="text-center text-sm text-muted-foreground w-full"
            variants={formItemVariant}
          >
            Zaten bir hesabınız var mı?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              Giriş yap
            </Link>
          </MotionP>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
};

export default FormCard;
