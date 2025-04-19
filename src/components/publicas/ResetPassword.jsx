"use client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import LogoArog from "./LogoArog";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ResetPasswordForm = () => {
  const router = useRouter();
  const params = useParams(); // Para rutas dinámicas como /reset-password/[token]
  const searchParams = useSearchParams(); // Para query params como ?token=xyz
  const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [showPassword, setshowPassword] = useState("password");

  // Determinar de dónde viene el token
  useEffect(() => {
    // Primero intentar obtenerlo de los params de ruta
    if (params?.token) {
      setToken(params.token);
    }
    // Si no está en params, buscar en query params
    else if (searchParams.get("token")) {
      setToken(searchParams.get("token"));
    }
    // Otra opción: usar pathname para extraerlo manualmente
    else {
      const pathname = window.location.pathname;
      const tokenFromPath = pathname.split("/").pop();
      if (tokenFromPath && tokenFromPath !== "reset-password") {
        setToken(tokenFromPath);
      }
    }
  }, [params, searchParams]);

  const onSubmit = async (data) => {
    if (!token) {
      return setMessage("No se pudo obtener el token de restablecimiento");
    }

    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return setMessage("Las contraseñas no coinciden");
    }

    try {
      // Usar una variable de entorno o configuración para la URL base
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
      const response = await axios.post(
        `${baseUrl}/api/aauth/reset-password/${token}`,
        { password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Asegúrate de capturar correctamente la respuesta
      console.log("Respuesta del servidor:", response.data);

      // Maneja la respuesta como string o como objeto
      if (typeof response.data === "string") {
        setMessage(response.data);
      } else if (typeof response.data === "object" && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage("Contraseña actualizada exitosamente");
      }
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      setMessage(
        error.response?.data?.message ||
          "Hubo un error al restablecer la contraseña"
      );
    }
  };

  // ...existing code...
  return (
    <div className="w-full hoja-dos min-h-screen flex justify-center items-center px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="reset-password-form border px-10 py-14 w-full max-w-lg mx-auto flex flex-col gap-4 rounded-lg shadow-lg filter"
      >
        <div className="h-16 flex justify-center items-center mb-6">
          <LogoArog className={`w-16 h-16`} />
        </div>
        <h1 className="text-verde-dos font-semibold text-xl md:text-2xl text-start">
          Restablecer Contraseña
        </h1>
        <div className="flex flex-col gap-2 mb-2">
          <div className="">
            <div className="w-full h-12 md:h-14 relative">
              <input
                type={showPassword}
                placeholder="Nueva contraseña"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                })}
                className={`block h-full w-full px-4 py-2 mt-2 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-4 border-verde-dos hover:border-verde focus:border-verde rounded-lg focus:outline-none text-base md:text-xl pl-10 ${
                  errors.password ? "border-red-500" : "border-verde"
                }`}
              />
              <i className="fa-solid fa-lock absolute text-verde top-1/2 -translate-y-1/2 left-3 text-lg md:text-xl"></i>
              <i
                onClick={() => {
                  setshowPassword((prevState) =>
                    prevState === "password" ? "text" : "password"
                  );
                }}
                className="fa-solid fa-eye absolute text-verde top-1/2 -translate-y-1/2 left-[90%] text-lg md:text-xl cursor-pointer"
              ></i>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="w-full h-12 md:h-14 relative">
              <input
                type={showPassword}
                placeholder="Confirmar contraseña"
                {...register("confirmPassword", {
                  required: "La confirmación es obligatoria",
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                })}
                className={`block h-full w-full px-4 py-2 mt-2 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-4 border-verde-dos hover:border-verde focus:border-verde rounded-lg focus:outline-none text-base md:text-xl pl-10 ${
                  errors.confirmPassword ? "border-red-500" : "border-verde"
                }`}
              />
              <i className="fa-solid fa-lock absolute text-verde top-1/2 -translate-y-1/2 left-3 text-lg md:text-xl"></i>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <button
          className="px-5 py-3 text-white font-medium text-base md:text-lg rounded-lg bg-verde hover:bg-verde-dos transition-colors duration-300"
          type="submit"
        >
          Restablecer
        </button>

        {message && (
          <div className="mt-4 text-center">
            <p className="text-sm md:text-base mb-2">{message}</p>
            {typeof message === "string" &&
              message.toLowerCase().includes("exitosamente") && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push("/auth/inicio");
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm md:text-base w-full md:w-auto"
                >
                  Iniciar Sesión
                </button>
              )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordForm;
