"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { requestPasswordResetRequest } from "@/api/auth";
import LogoArog from "./LogoArog";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState({ type: "", message: "" });

  const onSubmit = async (data) => {
    try {
      await requestPasswordResetRequest(data.email);
      setStatus({
        type: "success",
        message:
          "Se ha enviado un enlace de recuperación a tu correo electrónico",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Error al enviar el correo",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="border px-4 sm:px-6 md:px-10 py-14 rounded-xl shadow-lg filter">
          <div className="flex justify-center items-center mb-6">
            <LogoArog className="w-16 h-16 md:w-20 md:h-20" />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold mb-6 text-verde-dos text-start">
            Recuperar contraseña
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Ingresa tu correo"
                {...register("email", { 
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico inválido"
                  }
                })}
                className={`block w-full px-4 py-3 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-2 md:border-b-4 
                border-verde-dos hover:border-verde focus:border-verde rounded-lg focus:outline-none text-sm md:text-base pl-10 ${
                  errors.email ? "border-red-500" : "border-verde"
                }`}
              />
              <i className="fa-solid fa-envelope absolute text-verde top-1/2 -translate-y-1/2 left-3 text-base md:text-lg"></i>
              
              {errors.email && (
                <p className="text-red-500 text-xs md:text-sm mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-verde hover:bg-verde-dos px-3 py-3 rounded-lg text-base md:text-lg font-medium text-white transition-colors duration-300"
            >
              Enviar enlace de recuperación
            </button>
          </form>

          {status.message && (
            <div
              className={`mt-6 p-3 rounded-lg text-sm md:text-base text-white text-center ${
                status.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}