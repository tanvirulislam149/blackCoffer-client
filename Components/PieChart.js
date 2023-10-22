import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const unique = data.filter((obj, index) => {  // removing elements that have the same region and empty region
    return index === data.findIndex(o => obj.region === o.region) && obj.region !== "";
  });
  let region = unique.map(a => a.region); // making an array of all unique region
  let borderArray = [];

  const colorArray = unique.map(d => {  // making random color array according to the "unique" array
    const r = Math.floor(Math.random() * (255 + 1));
    const g = Math.floor(Math.random() * (255 + 1));
    const b = Math.floor(Math.random() * (255 + 1));
    borderArray.push(`rgb(${r}, ${g}, ${b})`);
    const color = `rgba(${r}, ${g}, ${b}, 0.2)`;
    return color;
  })



  const options = {
    parsing: {
      key: "intensity"
    },
    plugins: {
      legend: {
        position: 'left',
      },
    },
  };
  const data2 = {
    labels: region,
    datasets: [
      {
        label: 'Intensity',
        data: unique,
        backgroundColor: colorArray,
        borderColor: borderArray,
        borderWidth: 1,
      },
    ],
  }


  return (
    <div className='w-8/12 mx-auto border-2 border-neutral-300 rounded-lg bg-white p-10'>
      <p className='text-2xl pb-0 font-medium'>Pie Chart</p>
      <p className='text-sm'>Showing intensity according to Region</p>
      <Pie
        options={options}
        data={data2}
      />
    </div>
  )
}

export default PieChart