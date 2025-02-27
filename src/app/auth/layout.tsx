"use client";

import Image from "next/image";
import { floatingAnimation, MotionDiv, pulseAnimation } from "@/lib/motion";
import { fadeIn, slideIn } from "@/lib/motion";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen md:flex flex-col md:flex-row bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Sol taraf - Görsel ve bilgi bölümü */}
      <MotionDiv
        className="w-full hidden lg:flex  lg:w-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 md:p-12  flex-col justify-center relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Dekoratif animasyonlu arka plan öğeleri */}
        <MotionDiv
          className="absolute top-5 right-10 w-20 h-20 rounded-full bg-blue-400 opacity-20"
          initial="initial"
          animate="animate"
          variants={pulseAnimation}
        />
        <MotionDiv
          className="absolute bottom-12 left-12 w-32 h-32 rounded-full bg-blue-400 opacity-10"
          initial="initial"
          animate="animate"
          variants={pulseAnimation}
          style={{ animationDelay: "0.5s" }}
        />
        <MotionDiv
          className="absolute top-2/4 left-1/4 w-16 h-16 rounded-full bg-white opacity-10"
          initial="initial"
          animate="animate"
          variants={pulseAnimation}
          style={{ animationDelay: "1s" }}
        />

        <MotionDiv className="max-w-xl mx-auto z-10" variants={slideIn}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Invenza Otel Yönetim Sistemi
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-50">
            Otel envanterinizi yönetin ve yapay zeka destekli sohbet ile
            stoklarınız hakkında bilgi alın.
          </p>

          <MotionDiv
            className="relative w-full h-0 pb-[80%] overflow-hidden"
            initial="initial"
            animate="animate"
            variants={floatingAnimation}
          >
            <Image
              src="/images/svg/auth-image.svg"
              alt="Otel Yönetim Sistemi"
              fill
              className="object-contain p-2"
              priority
            />
          </MotionDiv>

          <div className="mt-12 text-sm opacity-80 border-t border-blue-400 pt-4">
            <p className="flex items-center justify-between">
              <span>© 2025 Invenza Stok Yönetim Sistemi</span>
              <span className="text-blue-200">v1.0</span>
            </p>
          </div>
        </MotionDiv>
      </MotionDiv>

      {/* Sağ taraf - Form bölümü */}
      <MotionDiv
        className="w-full lg:w-1/2 p-8 md:p-12 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="w-full max-w-md">{children}</div>
      </MotionDiv>
    </div>
  );
};

export default AuthLayout;
