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
  const uniqueData = data.filter((obj, index) => {  // removing elements that have the same country name and elements that don't have a country name
    const result = index === data.findIndex(o => obj.country === o.country) && obj.country !== ""
    return result;
  });

  const ChartData = {
    datasets: [
      {
        label: "Relevance",
        data: uniqueData,
        borderColor: "rgb(255, 246, 55)",
        backgroundColor: "rgba(255, 246, 55, 0.4)",
        fill: true,
        parsing: {
          xAxisKey: 'country',
          yAxisKey: 'relevance'
        }
      },
      {
        label: "Likelihood",
        data: uniqueData,
        borderColor: "rgb(178, 217, 255)",
        backgroundColor: "rgba(178, 217, 255, 0.5)",
        fill: true,
        parsing: {
          xAxisKey: 'country',
          yAxisKey: 'likelihood'
        }
      }],
  };


  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 5
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
      <p className='text-2xl font-medium'>Line Chart</p>
      <p className='text-sm pb-5'>Showing Likelihood and Relevance according to country</p>
      <Line
        options={options}
        data={ChartData}
      />
    </div>
  )
}

export default LineChart