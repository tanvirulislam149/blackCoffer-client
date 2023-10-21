import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const LineChart = ({ data }) => {
  const finalData = data.slice(0, 25);

  const ChartData = {
    datasets: [{
      label: "relevance",
      data: finalData,
      borderColor: "rgb(220, 38, 38)",
      backgroundColor: "rgba(220, 38, 38, 0.4)",
      fill: true,
      parsing: {
        xAxisKey: 'source',
        yAxisKey: 'relevance'
      }
    },
    {
      label: "likelihood",
      data: finalData,
      borderColor: "rgb(23 37 84)",
      backgroundColor: "rgba(23, 37, 84, 0.5)",
      fill: true,
      parsing: {
        xAxisKey: 'source',
        yAxisKey: 'likelihood'
      }
    }],
  };


  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart',
      },
    },
  };
  return (
    <Line
      options={options}
      data={ChartData}
    />
  )
}

export default LineChart