import React from 'react';

const TimelineBar = ({
  title,
  subtitle,
  id,
  startTime,
  endTime,
  startHour = 9,
  endHour = 17,
  barColor = 'verde',
  barText,
}) => {
  const parseTime = (timeStr) => {
    try {
      // Si es un string de formato HH:MM
      if (typeof timeStr === 'string' && timeStr.includes(':') && !timeStr.includes('T')) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours + minutes / 60;
      }
      // Si es un string ISO de fecha completa (como 2025-03-10T14:35:00.000Z)
      else if (typeof timeStr === 'string' && timeStr.includes('T')) {
        const date = new Date(timeStr);
        return date.getUTCHours() + date.getUTCMinutes() / 60;
      }
      // Valor por defecto
      return startHour;
    } catch (error) {
      console.error("Error parsing time:", error, timeStr);
      return startHour;
    }
  };

  const startValue = parseTime(startTime);
  const endValue = parseTime(endTime);

  // Verificar que los valores sean números válidos
  const validStartValue = isNaN(startValue) ? startHour : startValue;
  const validEndValue = isNaN(endValue) ? endHour : endValue;

  const totalHours = endHour - startHour;
  const barStartPercent = ((validStartValue - startHour) / totalHours) * 100;
  const barWidthPercent = ((validEndValue - validStartValue) / totalHours) * 100;

  const generateTimeMarks = () => {
    const marks = [];
    for (let h = startHour; h <= endHour; h++) {
      marks.push({
        time: h,
        label: `${h}:00`,
      });

      if (h < endHour) {
        marks.push({
          time: h + 0.5,
          label: `${h}:30`,
        });
      }
    }
    return marks;
  };

  const timeMarks = generateTimeMarks();

  // Calcular la diferencia de tiempo solo si los valores son válidos
  let displayBarText = barText;
  if (!displayBarText) {
    if (!isNaN(validStartValue) && !isNaN(validEndValue)) {
      const timeDifference = validEndValue - validStartValue;
      displayBarText = `${timeDifference.toFixed(1)} hrs`;
    } else {
      displayBarText = "Horario no disponible";
    }
  }

  return (
    <div className="w-full flex items-stretch border 2xl:items-center 2xl:h-8/10 border-gray-200 rounded-md overflow-hidden mb-0 2xl:mb-3">
      <div className={`w-2 bg-${barColor}`}></div>

      <div className="flex-1 p-2 ">
        <div className="flex w-full items-center gap-5">
          <div className="flex flex-col text-left w-2/10">
            <div className="text-sm 2xl:text-lg font-medium text-gray-700">{id}</div>
            <div className="text-sm 2xl:text-lg text-gray-700">{title}</div>
            <div className="text-xs 2xl:text-sm text-gray-500">{subtitle}</div>
          </div>

          <div className="h-full relative w-8/10 pr-5 flex items-center">
            <div className="h-8 2xl:h-12 bg-gray-100 rounded-md w-full mb-4"></div>
            <div
              className={`absolute -top-[0.10rem] h-9 2xl:h-14 2xl:text-lg bg-${barColor} rounded-md flex justify-center items-center text-white text-xs`}
              style={{
                left: `${barStartPercent}%`,
                width: `${Math.max(barWidthPercent, 5)}%`, // Asegurar un ancho mínimo visible
              }}
            >
              {displayBarText}
            </div>

            <div className="absolute top-2 w-full h-full flex items-end ">
              {timeMarks.map((mark, index) => {
                const position = ((mark.time - startHour) / totalHours) * 100;
                const isFullHour = mark.time % 1 === 0;

                return (
                  <div
                    key={index}
                    className="absolute bottom-0"
                    style={{
                      left: `${position}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {isFullHour && <div className="text-xs text-gray-500">{mark.label}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente actualizado para recibir datos
const TimelineExample = ({ datos = [] }) => {
  // Debug de datos recibidos
  console.log("Datos recibidos en TimelineExample:", datos);

  // Función para formatear la hora de un string ISO para mostrar
  const formatHora = (isoString) => {
    if (!isoString) return '00:00';
    try {
      const date = new Date(isoString);
      return `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
    } catch (e) {
      console.error("Error formateando hora:", e);
      return '00:00';
    }
  };

  // Determinar el rango de horas para mostrar en la gráfica
  const determinarRangoHoras = (datos) => {
    if (!datos || datos.length === 0) return { inicio: 8, fin: 18 };

    let minHora = 23;
    let maxHora = 0;

    datos.forEach(item => {
      if (item.horaInicio) {
        try {
          const inicioDate = new Date(item.horaInicio);
          const inicioHora = inicioDate.getUTCHours();
          minHora = Math.min(minHora, inicioHora);
          console.log("Hora inicio:", inicioHora, "de", item.horaInicio);
        } catch (e) {
          console.error("Error procesando hora inicio:", e);
        }
      }

      if (item.horaFin) {
        try {
          const finDate = new Date(item.horaFin);
          const finHora = finDate.getUTCHours();
          maxHora = Math.max(maxHora, finHora);
          console.log("Hora fin:", finHora, "de", item.horaFin);
        } catch (e) {
          console.error("Error procesando hora fin:", e);
        }
      }
    });

    return {
      inicio: Math.max(0, minHora - 1),
      fin: Math.min(23, maxHora + 1)
    };
  };

  // Obtener el rango de horas
  const { inicio, fin } = determinarRangoHoras(datos);
  console.log("Rango de horas calculado:", inicio, "a", fin);

  // Si no hay datos, mostrar un ejemplo
  if (!datos || datos.length === 0) {
    return (
      <div className="p-4 border rounded-lg 2xl:h-full">
        <div className="text-gray-500 text-sm mb-1 2xl:mb-4">Selecciona una ruta para ver sus horarios</div>
        <TimelineBar
          id="Ejemplo"
          title="Ruta ejemplo"
          subtitle="Funcionario ejemplo"
          startTime="10:00"
          endTime="16:00"
          startHour={8}
          endHour={18}
          barColor="gray"
          barText="Sin datos"
        />
      </div>
    );
  }

  return (
    <div className="2xl:p-4 p-2 border rounded-lg h-full 2xl:h-full">
      <h2 className="text-lg font-medium mb-1 2xl:mb-3">Duracion Ruta</h2>
      {datos.map((item, index) => {
        // Formatear horarios para mostrar en el subtítulo
        const horaInicioStr = formatHora(item.horaInicio);
        const horaFinStr = item.horaFin ? formatHora(item.horaFin) : "La ruta no ha terminado";

        return (
          <TimelineBar
            key={index}
            id={`Ruta-${index + 1}`}
            title={item.ruta || 'Ruta sin nombre'}
            subtitle={`${item.encargado || 'Sin asignar'} - ${item.vehiculo || 'Sin vehículo'} - ${item.horaFin ? `${horaInicioStr} - ${horaFinStr}` : `${horaInicioStr}` }`}
            startTime={item.horaFin ? item.horaInicio : "08:00"}
            endTime={item.horaFin ? item.horaFin : "16:00"}
            startHour={item.horaFin ? inicio : 8}
            endHour={item.horaFin ? fin : 18}
            barColor={item.horaFin ? 'verde' : 'gray'}
            barText={item.horaFin ? `${((new Date(item.horaFin) - new Date(item.horaInicio)) / (1000 * 60 * 60)).toFixed(1)} hrs` : "En curso"}

          />
        );
      })}
    </div>
  );
};

export default TimelineExample;