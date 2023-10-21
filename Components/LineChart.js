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
  console.log(finalData);

  const ChartData = {
    datasets: [
      {
        label: "Likelihood",
        data: finalData,
        borderColor: "rgb(178, 217, 255)",
        backgroundColor: "rgba(178, 217, 255, 0.5)",
        fill: true,
        parsing: {
          xAxisKey: 'source',
          yAxisKey: 'likelihood'
        }
      },
      {
        label: "Relevance",
        data: finalData,
        borderColor: "rgb(255, 246, 55)",
        backgroundColor: "rgba(255, 246, 55, 0.5)",
        fill: true,
        parsing: {
          xAxisKey: 'source',
          yAxisKey: 'relevance'
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
          text: "Source",
        },
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Line Chart',
      },
    },
  };
  return (
    <div className='w-4/5 h-4/5 mx-auto border-2 border-neutral-300 rounded-lg bg-white p-10'>
      <p className='text-2xl pb-5 font-medium'>Line Chart</p>
      <Line
        options={options}
        data={ChartData}
      />
    </div>
  )
}

export default LineChart