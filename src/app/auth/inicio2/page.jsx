"use client"
import { useForm } from "react-hook-form";
import { useAauth } from "@/context/AauthContext";
import { useRouter } from "next/navigation"; // Importar useRouter
import Link from "next/link";
import { useEffect } from "react";
// import Logo from "../components/Logo";
// import "../App.css";

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signin, errors: signErrors, isAuthenticated } = useAauth();
    const router = useRouter(); // Usar useRouter

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    useEffect(() => {
        if (isAuthenticated) router.push('/secure/administrador'); // Usar router.push
    }, [isAuthenticated, router]); // Agregar router como dependencia

    const handleGoogleLogin = () => {
        if (typeof window !== "undefined") {
        //   window.location.href = "http://localhost:3002/api/auth/google";
          window.location.href = "https://backend-arog-v4.onrender.com/api/auth/google";
        }
      };

    return (
        <div className="flex items-center justify-center h-full bg-zinc-900">
            <article className="w-full flex justify-center h-full items-center blackBlock">
                <div className="w-2/6 2xl:p-10 h-full rounded-md flex flex-col justify-center">
                    <div className="border 2xl:py-5 py-3 px-10 rounded-xl h-[90%] contain shadow-2xl">
                        <div className="h-[15%] flex justify-center items-center">
                            {/* <Logo className={`2xl:w-32 w-24`} /> */}
                        </div>
                        <h1 className="text-2xl font-bold h-[10%] text-white flex items-start">
                            Inicio Sesión
                        </h1>
                        <form onSubmit={onSubmit} className="h-[40%]">
                            <div className="h-[40%]">
                                <input
                                    type="email"
                                    {...register("correoElectronico", { required: true })}
                                    className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md h-[70%] placeholder:text-white shadow-xl"
                                    placeholder="Correo"
                                />
                                {errors.correoElectronico && (
                                    <p className="text-red-500 text-sm">El correo es requerido</p>
                                )}
                            </div>
                            <div className="h-[40%]">
                                <input
                                    type="password"
                                    {...register("contraseña", { required: true })}
                                    className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md h-[70%] placeholder:text-white shadow-lg"
                                    placeholder="Contraseña"
                                />
                                {errors.contraseña && (
                                    <p className="text-red-500 text-sm">
                                        La contraseña es requerida
                                    </p>
                                )}
                            </div>
                            <div className="h-[20%] flex items-center">
                                <button
                                    className="bg-red-700 px-3 w-full h-full py-1 rounded-md hover:bg-red-800 text-xl text-white font-semibold"
                                    type="submit"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                        </form>
                        <div className="h-[10%] mt-4">
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full bg-white text-gray-700  rounded-md px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                            >
                                <img
                                    src="https://img.icons8.com/?size=512&id=17949&format=png"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                Continuar con Google
                            </button>
                        </div>
                        <Link href="/forgot-password" className="text-red-700 hover:text-red-800 text-lg">
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <p className="flex gap-2 text-lg items-center justify-between h-[5%] text-white">
                            No tienes una cuenta?
                            <Link
                                href="/register"
                                className="text-red-700 hover:red-800 font-bold"
                            >
                                Registrate
                            </Link>
                        </p>
                        <div className="h-[10%]">
                            {signErrors.map((error, i) => (
                                <div className="text-red-500" key={i}>
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

export default LoginPage;