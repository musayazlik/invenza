"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Lock, Loader } from "lucide-react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  MotionDiv,
  MotionP,
  staggerContainer,
  formItemVariant,
} from "@/lib/motion";

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
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

// Form şeması tanımlama
import { loginSchema, LoginFormData } from "@/lib/validations/auth/login";

const FormCard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Giriş başarısız. E-posta veya şifre hatalı.");
        setIsLoading(false);
        return;
      }

      // Başarılı giriş
      toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
      router.push("/panel");
    } catch (error) {
      console.error("Giriş hatası:", error);
      toast.error("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      setIsLoading(false);
    }
  };

  return (
    <MotionDiv initial="hidden" animate="visible" variants={staggerContainer}>
      <Card className="w-full shadow-lg border-0 shadow-zinc-200">
        <CardHeader className="space-y-1">
          <MotionDiv variants={formItemVariant}>
            <CardTitle className="text-3xl font-bold text-center">
              Giriş Yap
            </CardTitle>
            <CardDescription className="text-center text-gray-600 mt-2">
              Hesabınıza giriş yaparak sistemi kullanmaya başlayın.
            </CardDescription>
          </MotionDiv>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <MotionDiv className="space-y-4" variants={formItemVariant}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <User size={18} />
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
              </MotionDiv>

              <MotionDiv
                className="flex items-center justify-between"
                variants={formItemVariant}
              >
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-5 w-5"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <Label
                            htmlFor="remember"
                            className="text-sm text-gray-600"
                          >
                            Beni hatırla
                          </Label>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Şifremi unuttum
                </Link>
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
                    "Giriş Yap"
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
            Hesabınız yok mu?{" "}
            <Link
              href="/auth/register"
              className="text-primary font-medium hover:underline"
            >
              Kayıt ol
            </Link>
          </MotionP>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
};

export default FormCard;
