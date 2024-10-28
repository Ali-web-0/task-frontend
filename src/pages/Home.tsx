import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import io from 'socket.io-client';
import { config } from '../config';
import './Home.css';

const socket = io(config.baseUrl);
Chart.register(...registerables);

const Home = () => {
  const [tradeData, setTradeData] = useState<any>(null);
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('trade', (data: any) => {
      setTradeData(data);

      const time = new Date(data.t).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const price = parseFloat(data.currentPrice);

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
          <p>
            Symbol: <strong>{tradeData.s}</strong>
          </p>
          <p>
            Price:{' '}
            <span className="current-price">
              ${tradeData.currentPrice.toFixed(2)}
            </span>
          </p>
          <p
            className={`compared ${
              tradeData.trend === 'increase'
                ? 'increase'
                : tradeData.trend === 'decrease'
                ? 'decrease'
                : ''
            }`}
          >
            {tradeData.trend === 'increase'
              ? '↑'
              : tradeData.trend === 'decrease'
              ? '↓'
              : ''}{' '}
            ${tradeData.compared.toFixed(2)}
          </p>
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

export default Home;
