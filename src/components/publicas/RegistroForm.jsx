
'use client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";
import Image from "next/image";

function RegistroForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { registro, isAuthenticated, errors: authErrors, clearErrors } = useAuth();
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState(null);
    const router = useRouter();
    const [showRequirements, setShowRequirements] = useState(false);

    // Referencia para comparar contraseñas
    const contraseña = watch('contraseña');

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/secure/administrador');
        }
    }, [isAuthenticated, router]);

    // Limpia errores de autenticación cuando se desmonta el componente
    useEffect(() => {
        return () => {
            clearErrors();
        };
    }, [clearErrors]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setRegisterError(null);

            // Eliminamos la confirmación de contraseña antes de enviar
            const userData = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                correoElectronico: data.correoElectronico,
                contraseña: data.contraseña,
                telefono: data.telefono
            };

            const resultado = await registro(userData);

            if (resultado.success) {
                router.push('/secure/administrador');
            } else {
                setRegisterError(resultado.message);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setRegisterError('Ha ocurrido un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-white/10 filter border rounded-lg shadow-xl border-t px-4 sm:px-8 md:px-14 py-6 sm:py-8 md:py-12 flex flex-col justify-evenly">
            {(registerError || authErrors) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {registerError || authErrors}
                </div>
            )}
            <div className="w-full flex justify-center mb-2 sm:mb-4">
                <Image src="/ArogV2.png" width={60} height={60} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" alt="Logo Arog" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-verde-dos">Registro</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-1 gap-2 sm:gap-4 md:gap-6 mt-2 sm:mt-3 md:grid-cols-2">
                    <div className='mt-2'>
                        <div className="w-full h-12 md:h-14 relative">
                            <input
                                type="text"
                                placeholder="Ingresa tus nombres"
                                {...register('nombres', {
                                    required: 'El nombre es obligatorio',
                                    minLength: {
                                        value: 3,
                                        message: 'El nombre debe tener al menos 3 caracteres'
                                    }
                                })}
                                className={`block h-full w-full px-4 py-2 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-4 border-verde-dos hover:border-verde rounded-lg focus:outline-none text-base sm:text-lg md:text-xl pl-10 focus:border-verde ${errors.nombres ? 'border-red-500' : 'border-verde'}`}
                            />
                            <i className="fa-solid fa-user absolute text-verde top-1/2 -translate-y-1/2 left-3 text-base sm:text-lg md:text-xl"></i>
                        </div>
                        {errors.nombres && (
                            <p className="text-red-500 text-sm mt-1">{errors.nombres.message}</p>
                        )}
                    </div>

                    <div className='mt-2'>
                        <div className="w-full h-12 md:h-14 relative">
                            <input
                                type="text"
                                placeholder="Ingresa tus apellidos"
                                {...register('apellidos', {
                                    required: 'El apellido es obligatorio',
                                    minLength: {
                                        value: 3,
                                        message: 'El Apellido debe tener al menos 3 caracteres'
                                    }
                                })}
                                className={`block h-full w-full px-4 py-2 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-4 border-verde-dos hover:border-verde focus:border-verde rounded-lg focus:outline-none text-base sm:text-lg md:text-xl pl-10 ${errors.apellidos ? "border-red-500" : "border-verde"}`}
                            />
                            <i className="fa-solid fa-signature absolute text-verde top-1/2 -translate-y-1/2 left-3 text-base sm:text-lg md:text-xl"></i>
                        </div>
                        {errors.apellidos && (
                            <p className="text-red-500 text-sm mt-1">{errors.apellidos.message}</p>
                        )}
                    </div>

                    <div className="mt-2">
                        <div className="w-full h-12 md:h-14 relative">
                            <input
                                type="text"
                                placeholder="Ingresa tu telefono"
                                {...register('telefono', {
                                    required: 'El telefono es obligatorio',
                                    minLength: {
                                        value: 10,
                                        message: 'Número de teléfono no valido'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Número de teléfono no valido'
                                    }
                                })}
                                className={`block h-full w-full px-4 py-2 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-4 border-verde-dos hover:border-verde focus:border-verde rounded-lg focus:outline-none text-base sm:text-lg md:text-xl pl-10 ${errors.telefono ? "border-red-500" : "border-verde"}`}
                            />
                            <i className="fa-solid fa-phone absolute text-verde top-1/2 -translate-y-1/2 left-3 text-base sm:text-lg md:text-xl"></i>
                        </div>
                        {errors.telefono && (
                            <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
                        )}
                    </div>

                    <div className="mt-2">
                        <div className="w-full h-12 md:h-14 relative">
                            <input
                                type="text"
                                placeholder="Ingresa tu correo"
                                {...register('correoElectronico', {
                                    required: 'El correo electrónico es obligatorio',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Introduce un correo electrónico válido'
                                    }
                                })}
                                className={`block h-full w-full px-4 py-2 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-4 border-verde-dos hover:border-verde focus:border-verde rounded-lg focus:outline-none text-base sm:text-lg md:text-xl pl-10 ${errors.correoElectronico ? "border-red-500" : "border-verde"}`}
                            />
                            <i className="fa-solid fa-envelope absolute text-verde top-1/2 -translate-y-1/2 left-3 text-base sm:text-lg md:text-xl"></i>
                        </div>
                        {errors.correoElectronico && (
                            <p className="text-red-500 text-sm mt-1">{errors.correoElectronico.message}</p>
                        )}
                    </div>

                    <div className="mt-2">
                        <div className="w-full h-12 md:h-14 relative">
                            <input
                                type="password"
                                placeholder="Ingresa una contraseña"
                                {...register('contraseña', {
                                    required: 'La contraseña es obligatoria',
                                    minLength: {
                                        value: 8,
                                        message: 'La contraseña debe tener al menos 8 caracteres'
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
                                        message: 'La contraseña debe incluir mayúsculas, minúsculas, un número y un carácter especial (@#$%^&+=!)'
                                    }
                                })}

                                className={`block h-full w-full px-4 py-2 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-4 border-verde-dos hover:border-verde focus:border-verde rounded-lg focus:outline-none text-base sm:text-lg md:text-xl pl-10 ${errors.contraseña ? "border-red-500" : "border-verde"}`}
                                onFocus={() => setShowRequirements(true)}
                                onBlur={() => setTimeout(() => setShowRequirements(false), 200)}
                            />
                            <i className="fa-solid fa-lock absolute text-verde top-1/2 -translate-y-1/2 left-3 text-base sm:text-lg md:text-xl"></i>
                        </div>
                        {errors.contraseña && (
                            <p className="text-red-500 text-sm mt-1">{errors.contraseña.message}</p>
                        )}
                    </div>

                    <div className="mt-2">
                        <div className="w-full h-12 md:h-14 relative">
                            <input
                                type="password"
                                placeholder="Confirma tu contraseña"
                                {...register('confirmarContraseña', {
                                    required: 'Debes confirmar tu contraseña',
                                    validate: (value) => value === contraseña || 'Las contraseñas no coinciden'
                                })}
                                className={`block h-full w-full px-4 py-2 text-verde-dos placeholder:text-gray-600 placeholder:font-thin bg-transparent border-b-4 border-verde-dos hover:border-verde focus:border-verde rounded-lg focus:outline-none text-base sm:text-lg md:text-xl pl-10 ${errors.confirmContraseña ? 'border-red-500' : 'border-gray-300'}`}

                            />
                            <i className="fa-solid fa-lock absolute text-verde top-1/2 -translate-y-1/2 left-3 text-base sm:text-lg md:text-xl"></i>
                        </div>
                        {errors.confirmContraseña && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmContraseña.message}</p>
                        )}
                    </div>
                </div>
                {showRequirements && (
                    <div className="w-full mt-3 md:mt-5 px-3 md:px-4 py-2 bg-yellow-100 border border-yellow-300 flex items-center gap-2 rounded-md">
                        <i className="fa-solid fa-triangle-exclamation text-yellow-500 text-sm md:text-lg"></i>
                        <p className="text-yellow-700 text-xs md:text-sm">
                            La contraseña debe tener más de 8 caracteres, al menos una
                            letra mayúscula, una letra minúscula, un número y un carácter
                            especial (<strong>@#$%^&+=!</strong>).
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 md:px-6 py-2 h-12 md:h-14 text-sm md:text-lg font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-verde-principal rounded-lg hover:bg-lime-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 ${showRequirements ? "mt-3" : "mt-4 sm:mt-6 md:mt-8"
                        } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>


            <div className="flex items-center mt-3 -mx-2">
                <Link
                    href="#"
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
                </Link>
            </div>

            <p className="mt-3 text-xs sm:text-sm md:text-base font-light text-center text-white">
                {" "}
                Ya tienes una cuenta?{" "}
                <Link
                    href="/auth/inicio"
                    className="text-verde-dos font-semibold"
                >
                    Inicia sesión
                </Link>
            </p>
        </div>
    )
}

export default RegistroForm