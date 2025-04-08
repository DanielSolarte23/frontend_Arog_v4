'use client'
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
      console.log(data);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full border">
      <article className="w-full flex justify-center h-6/10 items-center blackBlock border border-red-600"> 
        <div className="w-2/6 2xl:p-10 h-full rounded-md flex flex-col justify-center ">
          <div className="border 2xl:py-5 px-10 rounded-xl h-[90%] contain shadow-2xl filter py-5">

            
            <div className="h-2/10 flex justify-center items-center">
              {/* <Logo className="2xl:w-32 w-24" /> */}
              <LogoArog className={`w-20 h-20 mb-10`}/>
            </div>
            <h1 className="text-2xl font-bold mb-6">
              Recuperar contraseña
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full bg-transparent border outline-none text-xl px-4 py-4 rounded-md placeholder shadow-xl"
                  placeholder="Correo electrónico"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">El correo es requerido</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-verde px-3 py-4 rounded-md  text-xl font-semibold text-white"
              >
                Enviar enlace de recuperación
              </button>
            </form>

            {status.message && (
              <div
                className={`mt-4 p-3 rounded ${
                  status.type === "success" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {status.message}
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
