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
          hollow: { margin: 0, size: '75%', background: 'transparent' },
          track: { background: '#2A3447', strokeWidth: '100%', margin: 0 },
          dataLabels: {
            show: true,
            name: {
              show: true,
              fontSize: '11px',
              color: '#8A99AD',
              offsetY: 18,
              formatter: () => formatExpectedTime(expectedMinutes)
            },
            value: {
              show: true,
              fontSize: '15px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              offsetY: -12,
              formatter: () => formatCurrentTime(currentMinutes)
            }
          }
        }
      },
      fill: { colors: ['#8073FF'] },
      stroke: { lineCap: 'butt' }
    };
  }, [expectedMinutes, currentMinutes]);

  return (
    <div style={{ borderRadius: '12px', width: '120px' }}>
      <Chart options={options} series={series} type="radialBar" height={120} />
    </div>
  );
};

export default TimeProgressChart;