import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import io from 'socket.io-client';
import './Home.css';

const socket = io('https://oral-doti-eximia-d81f2754.koyeb.app/');

// Register Chart.js components
Chart.register(...registerables);

const CryptoTradeComponent = () => {
  const [tradeData, setTradeData] = useState<any>(null);
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  useEffect(() => {
    socket.on('trade', (data: any) => {
      setTradeData(data);

      const time = new Date(data.t).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const price = parseFloat(data.p);

      setDataPoints((prevData) => [...prevData, price]);
      setTimeLabels((prevLabels) => [...prevLabels, time]);
    });

    return () => {
      socket.off('trade');
    };
  }, []);

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Price',
        data: dataPoints,
        borderColor: 'rgba(0, 188, 212, 1)',
        backgroundColor: 'rgba(0, 188, 212, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="container">
      <h1 className="header">Live Trade Data</h1>
      {tradeData ? (
        <div className="trade-info">
          <p>Symbol: {tradeData.s}</p>
          <p>Price: ${tradeData.p}</p>
        </div>
      ) : (
        <p>No trade data received yet...</p>
      )}
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CryptoTradeComponent;
