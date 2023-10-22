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
  const uniqueData = data.filter((obj, index) => {  // removing elements that have the same topic name and elements that don't have a topic name, start year and end year.
    const result = index === data.findIndex(o => obj.topic === o.topic) && obj.topic !== "" && obj.start_year !== "" && obj.end_year !== ""
    return result;
  });
  const ChartData = {
    datasets: [
      {
        label: "Start Year",
        data: uniqueData,
        backgroundColor: "rgba(63, 255, 25, 0.5)",
        fill: true,
        parsing: {
          xAxisKey: 'topic',
          yAxisKey: 'start_year'
        }
      },
      {
        label: "End Year",
        data: uniqueData,
        backgroundColor: "rgba(255, 136, 137, 0.5)",
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
        beginAtZero: false,
        suggestedMin: 1500,
        suggestedMax: 2500
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
      <p className='text-2xl font-medium'>Bar Chart</p>
      <p className='text-sm pb-5'>Showing start year and end year according to Topic</p>
      <Bar options={options} data={ChartData} />
    </div>
  )
}

export default BarChart