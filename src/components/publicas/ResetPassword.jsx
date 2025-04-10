'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react"; // Importa useEffect
import { useForm } from "react-hook-form";
import axios from "axios";

const ResetPasswordForm = () => {
  const router = useRouter(); // Inicializa useRouter
  const { query, isReady } = router; // Obtén 'query' y 'isReady' del router
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null); // Estado local para el token

  // Usamos useEffect para esperar que el router esté listo
  useEffect(() => {
    if (isReady && query.token) {
      setToken(query.token); // Establecemos el token cuando el router esté listo
    }
  }, [isReady, query.token]); // Dependencias para ejecutar el efecto cuando se inicializa

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return setMessage("Las contraseñas no coinciden");
    }
    if (!token) {
      return setMessage("Token no disponible");
    }

    try {
      const res = await axios.post(
        `http://localhost:3002/api/aauth/reset-password/${token}`,
        { password }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Hubo un error al restablecer la contraseña");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="reset-password-form border px-5 py-5 w-3/5 h-4/5 flex flex-col gap-5 rounded-lg"
      >
        <div className="h-[15%] flex justify-center items-center">
          <Logo className={`2xl:w-32 w-24`} />
        </div>
        <h1 className="text-white font-extrabold text-2xl">
          Restablecer Contraseña
        </h1>
        <div className="flex flex-col gap-5 h-[30%]">
          <div className="h-[50%]">
            <input
              type="password"
              className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md h-[80%] placeholder:text-white shadow-xl"
              placeholder="Nueva contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="error text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="h-[50%]">
            <input
              type="password"
              className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md h-[80%] placeholder:text-white shadow-xl"
              placeholder="Confirmar contraseña"
              {...register("confirmPassword", {
                required: "La confirmación es obligatoria",
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <p className="error text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <button
          className="px-5 py-3 text-white font-bold text-xl rounded-lg bg-red-600"
          type="submit"
        >
          Restablecer
        </button>

        <p>
          {message && (
            <>
              {message}{" "}
              {message.toLowerCase().includes("exitosamente") && (
                <button onClick={() => router.push('/login')}>
                  Iniciar Sesión
                </button>
              )}
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
