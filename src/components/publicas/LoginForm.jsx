"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import LogoArog from "@/components/publicas/LogoArog";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useAauth } from "@/context/AauthContext";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    signin,
    isAuthenticated,
    errors: signErrors,
    // clearErrors,
  } = useAauth();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [showPassword, setshowPassword] = useState("password");
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/secure/administrador");
    }
  }, [isAuthenticated, router]);
  // Limpia errores de autenticación cuando se desmonta el componente
  //   useEffect(() => {
  //     return () => {
  //       clearErrors();
  //     };
  //   }, [clearErrors]);

  // const onSubmit = async (data) => {
  //     try {
  //         setLoading(true);
  //         setLoginError(null);
  //         const resultado = await signin(data);

  //         if (resultado.success) {
  //             router.push('/secure/administrador');
  //         } else {
  //             setLoginError(resultado.message);
  //         }
  //     } catch (error) {
  //         console.error('Error al iniciar sesión:', error);
  //         setLoginError('Ha ocurrido un error inesperado');
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  const handleGoogleLogin = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://backend-arog-v4.onrender.com/api/auth/google";
    }
  };
  

  return (
    <div className="w-full  bg-white/10 filter border rounded-lg shadow-xl px-4 sm:px-8 md:px-10 lg:px-14 py-8 md:py-12 lg:py-10 flex flex-col">
      {signErrors.map((error, i) => (
        <div className="text-red-500" key={i}>
          {error}
        </div>
      ))}
      <div className="w-full flex justify-center mb-3 md:mb-4">
        <Image
          src="/ArogV2.png"
          width={60}
          height={60}
          className="w-16 h-16 md:w-20 md:h-20"
          alt="Logo Arog"
        />
      </div>
      <h2 className="text-2xl sm:text-3xl text-verde-dos font-bold">
        Inicia sesión
      </h2>
      <form onSubmit={onSubmit} className="mt-2">
        <div className="mb-4">
          <div className="w-full h-12 md:h-14 relative">
            <input
              type="email"
              placeholder="Ingresa tu correo"
              {...register("correoElectronico", {
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Introduce un correo electrónico válido",
                },
              })}
              className={`block h-full w-full px-4 py-2 mt-2 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-4 border-verde-dos hover:border-verde focus:border-verde rounded-lg focus:outline-none text-base md:text-xl pl-10 ${
                errors.correoElectronico ? "border-red-500" : "border-verde"
              }`}
            />
            <i className="fa-solid fa-envelope absolute text-verde top-1/2 -translate-y-1/2 left-3 text-lg md:text-xl"></i>
          </div>
          {errors.correoElectronico && (
            <p className="text-red-500 text-sm mt-1">
              {errors.correoElectronico.message}
            </p>
          )}
        </div>
        <div className="mt-4 md:mt-6">
          <div className="w-full h-12 md:h-14 relative">
            <input
              type={showPassword}
              placeholder="Ingresa tu contraseña"
              {...register("contraseña", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              className={`block h-full w-full px-4 py-2 mt-2 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-4 border-verde-dos hover:border-verde focus:border-verde rounded-lg focus:outline-none text-base md:text-xl pl-10 ${
                errors.contraseña ? "border-red-500" : "border-verde"
              }`}
            />
            <i className="fa-solid fa-lock absolute text-verde top-1/2 -translate-y-1/2 left-3 text-lg md:text-xl"></i>
            <i
              onClick={() => {
                setshowPassword((prevState) =>
                  prevState === "password" ? "text" : "password"
                );
              }}
              className="fa-solid fa-eye absolute text-verde top-1/2 -translate-y-1/2 left-[95%] text-lg md:text-xl cursor-pointer"
            ></i>
          </div>
          {errors.contraseña && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contraseña.message}
            </p>
          )}
        </div>
        <div className="mt-2 md:mt-3">
          <p className="text-gray-600 text-sm md:text-lg">
            ¿Olvidaste tu contraseña?{" "}
            <Link
              className="text-verde-dos font-semibold"
              href="/auth/forgot-password"
            >
              Recuperar
            </Link>
          </p>
        </div>
        <div className="mt-4 md:mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-2 h-12 md:h-14 text-sm md:text-lg font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-verde-principal rounded-lg hover:bg-lime-600 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </div>
      </form>
      <div className="flex items-center mt-4 md:mt-6 -mx-2">
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="flex items-center justify-center w-full px-4 sm:px-6 py-2 mx-2 h-12 md:h-14 text-sm font-medium transition-colors duration-300 transform rounded-lg bg-verde-dos text-white"
        >
          <img
            className="h-6 w-6 md:h-8 md:w-8"
            src="https://img.icons8.com/?size=512&id=17949&format=png"
            alt="Google icon"
          />
          <span className="mx-2 text-sm sm:text-base md:text-lg">
            Continua con Google
          </span>
        </button>
      </div>
      <p className="mt-4 text-xs sm:text-sm md:text-base font-light text-center text-white">
        {" "}
        No tienes una cuenta?{" "}
        <Link href="registro" className="text-verde-dos font-semibold">
          Crear una
        </Link>
      </p>
    </div>
  );
}
export default LoginForm;
