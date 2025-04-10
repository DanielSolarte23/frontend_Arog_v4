'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ResetPasswordForm = () => {
  const router = useRouter(); // Inicializa useRouter
  const [token, setToken] = useState(null); // Guardamos el token en el estado
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token); // Establece el token cuando esté disponible
    }
  }, [router.query.token]); // Reaccionamos solo cuando el token cambia

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return setMessage("Las contraseñas no coinciden");
    }
    if (!token) {
      return setMessage("No se pudo encontrar el token");
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


// 'use client';
// import { useRouter } from 'next/navigation';
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// const ResetPasswordForm = () => {
//   const router = useRouter(); // Inicializa useRouter
//   const { token } = router.query; // Obtiene el token de la URL
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const [message, setMessage] = useState("");

//   const onSubmit = async (data) => {
//     const { password, confirmPassword } = data;
//     if (password !== confirmPassword) {
//       return setMessage("Las contraseñas no coinciden");
//     }
//     try {
//       const res = await axios.post(
//         `http://localhost:3002/api/aauth/reset-password/${token}`,
//         { password }
//       );
//       setMessage(res.data.message);
//     } catch (error) {
//       setMessage("Hubo un error al restablecer la contraseña");
//     }
//   };

//   return (
//     <div className="w-full h-full flex justify-center items-center">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="reset-password-form border px-5 py-5 w-3/5 h-4/5 flex flex-col gap-5 rounded-lg"
//       >
//         <div className="h-[15%] flex justify-center items-center">
//           <Logo className={`2xl:w-32 w-24`} />
//         </div>
//         <h1 className="text-white font-extrabold text-2xl">
//           Restablecer Contraseña
//         </h1>
//         <div className="flex flex-col gap-5 h-[30%]">
//           <div className="h-[50%]">
//             <input
//               type="password"
//               className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md h-[80%] placeholder:text-white shadow-xl"
//               placeholder="Nueva contraseña"
//               {...register("password", {
//                 required: "La contraseña es obligatoria",
//                 minLength: {
//                   value: 6,
//                   message: "Debe tener al menos 6 caracteres",
//                 },
//               })}
//             />
//             {errors.password && (
//               <p className="error text-red-600">{errors.password.message}</p>
//             )}
//           </div>

//           <div className="h-[50%]">
//             <input
//               type="password"
//               className="w-full bg-transparent border outline-none text-xl text-white px-4 py-2 rounded-md h-[80%] placeholder:text-white shadow-xl"
//               placeholder="Confirmar contraseña"
//               {...register("confirmPassword", {
//                 required: "La confirmación es obligatoria",
//                 validate: (value) =>
//                   value === watch("password") || "Las contraseñas no coinciden",
//               })}
//             />
//             {errors.confirmPassword && (
//               <p className="error text-red-600">{errors.confirmPassword.message}</p>
//             )}
//           </div>
//         </div>
//         <button
//           className="px-5 py-3 text-white font-bold text-xl rounded-lg bg-red-600"
//           type="submit"
//         >
//           Restablecer
//         </button>

//         <p>
//           {message && (
//             <>
//               {message}{" "}
//               {message.toLowerCase().includes("exitosamente") && (
//                 <button onClick={() => router.push('/login')}>
//                   Iniciar Sesión
//                 </button>
//               )}
//             </>
//           )}
//         </p>
//       </form>{" "}
//       F
//     </div>
//   );
// };

// export default ResetPasswordForm;