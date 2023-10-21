import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const finalData = data.slice(0, 25);
  let country = finalData.map(a => a.country);
  let region = finalData.map(a => a.region);
  const options = {
    parsing: {
      key: "intensity"
    }
  };
  const data2 = {
    labels: region,
    datasets: [
      {
        label: 'Intensity',
        data: finalData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className='w-4/5 h-4/5 mx-auto border-2 border-neutral-300 rounded-lg bg-white p-10'>
      <p className='text-2xl pb-5 font-medium'>Pie Chart</p>
      <Pie
        options={options}
        data={data2}
      />
    </div>
  )
}

export default PieChart