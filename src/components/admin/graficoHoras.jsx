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
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours + minutes / 60;
  };

  const startValue = parseTime(startTime);
  const endValue = parseTime(endTime);

  const totalHours = endHour - startHour;
  const barStartPercent = ((startValue - startHour) / totalHours) * 100;
  const barWidthPercent = ((endValue - startValue) / totalHours) * 100;

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
  const xAxisTicks = timeMarks.filter((mark) => mark.time % 1 === 0).map((mark) => mark.label);

  const timeDifference = endValue - startValue;
  const formattedTimeDifference = `${timeDifference} hrs`;
  const displayBarText = barText || formattedTimeDifference;

  return (
    <div className="w-full flex items-stretch border border-gray-200 rounded-md overflow-hidden ">
      <div className={`w-2 bg-${barColor}`}></div>

      <div className="flex-1 p-2 ">
        <div className="flex w-full items-center gap-5">
          <div className="flex flex-col text-left  w-2/10">
            <div className="text-sm font-medium text-gray-700">{id}</div>
            <div className="text-sm text-gray-700">{title}</div>
            <div className="text-xs text-gray-500">{subtitle}</div>
          </div>

          <div className="h-full relative w-8/10 pr-5 flex items-center">
            <div className="h-8 bg-gray-100 rounded-md w-full mb-4"></div>
            <div
              className={`absolute -top-[0.10rem] h-9 bg-${barColor} rounded-md flex justify-center items-center text-white`}
              style={{
                left: `${barStartPercent}%`,
                width: `${barWidthPercent}%`,
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

const TimelineExample = () => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <TimelineBar
        id="CPI-681"
        title="Aido Lucia"
        subtitle="Joshua Escobar"
        startTime="10:00"
        endTime="16:00"
        startHour={8}
        endHour={18}
      />
    </div>
  );
};

export default TimelineExample;