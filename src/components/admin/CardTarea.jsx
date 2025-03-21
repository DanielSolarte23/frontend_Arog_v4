const Cardtarea = ({tarea, handleDragStart}) => (
    <div
      key={tarea.id}
      className="block mb-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition cursor-pointer"
      draggable
      onDragStart={() => handleDragStart(tarea)}
    >
      <h5 className="mb-2 text-lg font-semibold text-black">{tarea.titulo}</h5>
      <p className="text-gray-700">{tarea.descripcion}</p>
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="fill-gray-400 w-4 h-4"
          >
            <path d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z" />
          </svg>
          <span className="text-sm ml-2 text-gray-400">
            {new Date(tarea.fechaLimite).toLocaleDateString('es-ES', { weekday: 'long' })}
          </span>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-gray-400 w-4 h-4"
          >
            <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z" />
          </svg>
          <span className="text-sm ml-2 text-gray-400">{tarea.prioridad}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          {tarea.asignado.nombres}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-gray-400 w-5 h-5"
          >
            <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
          </svg>
          {/* <span className="text-sm ml-2 text-gray-400">{tarea.asignado.split(' ')[0]}</span> */}
        </div>
      </div>
    </div>
  );

  export default Cardtarea;