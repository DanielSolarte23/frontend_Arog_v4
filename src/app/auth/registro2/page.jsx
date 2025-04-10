"use client";

import { useForm } from "react-hook-form";
import { useAauth } from "@/context/AauthContext";
import { useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
import Link from "next/link";
// import Logo from "../components/Logo";
import { useRouter } from "next/navigation";

function RegistesPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAauth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/auth/inicio");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  const handleGoogleLogin = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://backend-arog-v4.onrender.com/api/auth/google";
    }
  };

  return (
    <div className="flex items-end justify-center h-full bg-zinc-900">
      <article className="w-full flex justify-center h-full items-center blackBlock">
        <div className="w-2/6 h-full rounded-md flex flex-col justify-center">
          <div className="border 2xl:py-5 xl:py-3 px-10 rounded-xl  h-[90%] contain shadow-2xl">
            <div className="h-[20%] flex justify-center items-center">
              {/* <Logo className={`2xl:w-32 w-24`} /> */}
            </div>
            <h1 className="text-2xl font-bold  h-[10%] text-white flex items-start">
              Registrarse
            </h1>
            <form onSubmit={onSubmit} className=" h-[45%]">
              <div className="h-[26%] ">
                <input
                  type="text"
                  {...register("username", { required: true })}
                  className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md 2xl:h-[71%] xl:h-[66%] placeholder:text-white shadow-lg"
                  placeholder="nombre de usuario"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    el nombre de usuario es requerida
                  </p>
                )}
              </div>
              <div className="h-[26%]">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md 2xl:h-[71%] xl:h-[66%] placeholder:text-white shadow-xl"
                  placeholder="Correo"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center">
                    El correo es requerido{" "}
                  </p>
                )}
              </div>
              <div className="h-[26%] ">
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md 2xl:h-[71%] xl:h-[66%] placeholder:text-white shadow-lg"
                  placeholder="Contraseña"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    La contraseña es requerida
                  </p>
                )}
              </div>

              <div className="h-[17%] flex items-center">
                <button
                  className=" bg-red-700 px-3 w-full h-full flex justify-center items-center py-1 rounded-md hover:bg-red-800 text-xl text-white font-semibold"
                  type="submit"
                >
                  Registrarse
                </button>
              </div>
            </form>
            <div className="h-[10%]">
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-gray-700  rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://img.icons8.com/?size=512&id=17949&format=png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continuar con Google
              </button>
            </div>
            <p className="flex gap-2 text-lg items-center justify-between h-[5%] text-white">
              ya estas registrado?
              <Link
                href="/auth/inicio"
                className="text-red-700 hover:text-red-800 font-bold"
              >
                Iniciar Sesion
              </Link>
            </p>
            <div className="h-[10%]">
              {RegisterErrors.map((error, i) => (
                <div
                  className={`${
                    error.includes("verificación")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                  key={i}
                >
                  {error}
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default RegistesPage;
