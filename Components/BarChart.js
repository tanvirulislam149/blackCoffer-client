import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const finalData = data.slice(0, 150);
  const ChartData = {
    datasets: [
      {
        label: "Start Year",
        data: finalData,
        borderColor: "rgb(178, 217, 255)",
        backgroundColor: "rgba(178, 217, 255, 0.5)",
        fill: true,
        parsing: {
          xAxisKey: 'topic',
          yAxisKey: 'start_year'
        }
      },
      {
        label: "End Year",
        data: finalData,
        borderColor: "rgb(255, 246, 55)",
        backgroundColor: "rgba(255, 246, 55, 0.5)",
        fill: true,
        parsing: {
          xAxisKey: 'topic',
          yAxisKey: 'end_year'
        }
      },],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Topic",
        },
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Bar Chart',
      },
    },
  };
  return (
    <div className='w-4/5 h-4/5 mx-auto border-2 my-10 border-neutral-300 rounded-lg bg-white p-10'>
      <p className='text-2xl pb-5 font-medium'>Bar Chart</p>
      <Bar options={options} data={ChartData} />
    </div>
  )
}

export default BarChart