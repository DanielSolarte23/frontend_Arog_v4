import React from 'react'

function RegistroUsuarioForm({ handleCloseModal, usuarioSeleccionado, handleSubmit, handleInputChange, nuevoUsuario }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[500px]">
                <h2 className="text-lg md:text-xl font-normal mb-4 md:mb-6">
                    {usuarioSeleccionado ? "Editar Usuario" : "Agregar nuevo Usuario"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                        <div>
                            <label className="text-gray-500 ml-1" htmlFor="nombres">
                                Nombres
                            </label>
                            <input
                                type="text"
                                id="nombres"
                                name="nombres"
                                value={nuevoUsuario.nombres}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                placeholder="Ingresa el nombre"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 ml-1" htmlFor="apellidos">
                                Apellidos
                            </label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                value={nuevoUsuario.apellidos}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                placeholder="Ingresa los apellidos"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 ml-1" htmlFor="correoElectronico">
                                Correo electronico
                            </label>
                            <input
                                type="email"
                                id="correoElectronico"
                                name="correoElectronico"
                                value={nuevoUsuario.correoElectronico}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                placeholder="Ingresa el correo"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 ml-1" htmlFor="contraseña">
                                Contraseña {usuarioSeleccionado && "(Dejar vacío para mantener)"}
                            </label>
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                value={nuevoUsuario.contraseña}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                placeholder="Ingresa la contraseña"
                                {...(!usuarioSeleccionado && { required: true })}
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 ml-1" htmlFor="telefono">
                                Telefono
                            </label>
                            <input
                                type="text"
                                id="telefono"
                                name="telefono"
                                value={nuevoUsuario.telefono}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                placeholder="Ingresa el teléfono"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 ml-1" htmlFor="direccion">
                                Dirección
                            </label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={nuevoUsuario.direccion}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                placeholder="Ingresa la dirección"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 ml-1" htmlFor="rol">
                                Rol
                            </label>
                            <select
                                id="rol"
                                name="rol"
                                value={nuevoUsuario.rol}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                required
                            >
                                <option value="">Seleccionar rol</option>
                                <option value="administrador">Administrador</option>
                                <option value="recolector">Recolector</option>
                                <option value="ciudadano">Ciudadano</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                            onClick={handleCloseModal}
                        >
                            <span className="font-medium">Cancelar</span>
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition text-sm md:text-base w-full md:w-auto"
                        >
                            <span className="font-medium">
                                {usuarioSeleccionado ? "Guardar Cambios" : "Registrar Usuario"}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegistroUsuarioForm