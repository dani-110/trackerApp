import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';

const TimeProgressChart = ({ data }) => {
  const expectedMinutes = data?.expectedMinutes ?? 480;
  const currentMinutes = data?.currentMinutes ?? 0;

  
  const percentage = expectedMinutes > 0 ? (currentMinutes / expectedMinutes) * 100 : 0;
  const series = [Number(percentage.toFixed(2))];

  const formatCurrentTime = (mins) => {
    if (!mins) return '0m';
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours > 0 && remainingMins > 0) return `${hours}h ${remainingMins}m`;
    if (hours > 0) return `${hours}h`;
    return `${remainingMins}m`;
  };

  const formatExpectedTime = (mins) => {
    if (!mins) return 'of 0h';
    const hours = Math.floor(mins / 60);
    return `of ${hours}h`;
  };

  const options = useMemo(() => {
    return {
      chart: {
        type: 'radialBar',
        sparkline: { enabled: true }
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: { margin: 0, size: '78%', background: 'transparent' },
          track: { background: '#34445d', strokeWidth: '100%', margin: 0 },
          dataLabels: {
            show: false,
          }
        }
      },
      fill: { colors: ['#9488ff'] },
      stroke: { lineCap: 'round' }
    };
  }, [expectedMinutes, currentMinutes]);

  return (
    <div className="timeProgressChart">
      <Chart options={options} series={series} type="radialBar" height={104} />
      <div className="timeProgressLabels" aria-live="polite">
        <span className="timeProgressCurrent">{formatCurrentTime(currentMinutes)}</span>
        <span className="timeProgressExpected">{formatExpectedTime(expectedMinutes)}</span>
      </div>
    </div>
  );
};

export default TimeProgressChart;
