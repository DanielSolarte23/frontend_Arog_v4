import Link from "next/link";

function page() {
  return (
    <div className="h-full ">
      <div className="h-1/8"></div>
      <main className="h-7/8 flex fondo-logo">
        <div className="w-1/2 hidden md:block"></div>
        <div className="md:w-1/2 h-full mt-10 md:mt-0 w-full flex pl-14 justify-start items-center">
          <div className="w-4/5 md:h-7/8 h-full bg-white px-14 rounded-lg md:py-16 py-2 border-2 flex flex-col justify-center shadow-xl">
            <h2 className="text-3xl font-bold mt-5 md:mt-0">Registro</h2>
            <form className="grid grid-cols-1 md:gap-6 gap-2 md:mt-8 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm text-gray-600 lg:text-lg">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="ingrese su nombre"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-verde-principal focus:ring-verde-principal focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600  lg:text-lg">
                  Apellido
                </label>
                <input
                  type="text"
                  placeholder="Ingrese su apellido"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg     focus:border-verde-principal focus:ring-verde-principal focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 lg:text-lg">
                  Numero de telefono
                </label>
                <input
                  type="text"
                  placeholder="ingrese su numero telefonico"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-verde-principal focus:ring-verde-principal focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 lg:text-lg">
                  Correo
                </label>
                <input
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-verde-principal focus:ring-verde-principal focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 lg:text-lg">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-verde-principal focus:ring-verde-principal focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 lg:text-lg">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  placeholder="Confirme su contraseña"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-verde-principal focus:ring-verde-principal focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </form>
            <button className="mt-6 w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-verde-principal rounded-lg hover:bg-lime-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 lg:text-lg">
              Registrarse
            </button>

            <div className="flex items-center mt-6 -mx-2">
            <Link
                href="#"
                type="button"
                className="flex items-center justify-center w-full px-6 py-2 mx-2 h-14 text-sm font-medium transition-colors duration-300 transform border-2 rounded-lg border-verde text-verde"
              >
                <img className="h-8 w-8" src="https://img.icons8.com/?size=512&id=17949&format=png" alt="" />

                <span className="hidden mx-2 sm:inline md:text-lg">
                  Continua con Google
                </span>
              </Link>
            </div>

            <p className="mt-8 text-xs font-light text-center text-gray-400 lg:text-lg">
              {" "}
              Ya tienes una cuenta?{" "}
              <Link
                href="login"
                className="font-medium text-verde-principal hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
