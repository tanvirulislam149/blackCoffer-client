import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const [selectedSector, setSelectedSector] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [borderArray, setBorderArray] = useState([]);

  const unique = data.filter((obj, index) => {  // removing elements that have the same region and empty region
    return index === data.findIndex(o => obj.region === o.region) && obj.region !== "";
  });

  let region = (filteredData.length ? filteredData : unique).map(a => a.region); // making an array of all unique region
  let sectorArr = unique.map(a => a.sector).filter(d => d !== "");
  const sector = sectorArr.filter((item, index) => sectorArr.indexOf(item) === index);

  const handleSectorFilter = () => {
    const data = unique.filter(d => d.sector === selectedSector);
    setFilteredData(data);
  }

  console.log(filteredData);


  useEffect(() => {
    let borderArray = [];
    const colorArray = unique.map(d => {  // making random color array according to the "unique" array
      const r = Math.floor(Math.random() * (255 + 1));
      const g = Math.floor(Math.random() * (255 + 1));
      const b = Math.floor(Math.random() * (255 + 1));
      borderArray.push(`rgb(${r}, ${g}, ${b})`);  // pushing rgb color to border array so that rgb color remains the same
      const color = `rgba(${r}, ${g}, ${b}, 0.2)`;
      return color;
    })
    setColorArray(colorArray);
    setBorderArray(borderArray);
  }, [])
  console.log(colorArray);



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
        data: filteredData.length ? filteredData : unique,
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
      <select defaultValue={"default"} value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)} className='border-2 border-gray-300 px-1 py-1 mt-4 mr-4 rounded' name="endYear" id="endYear">
        <option value="default">Select sector</option>
        {sector.map((y, index) => <option key={index} value={y}>{y}</option>)}
      </select>
      <button className='px-4 mr-4 py-1 border-2 border-gray-300 rounded-md' onClick={() => handleSectorFilter()}>Filter</button>
      <button className='px-4 py-1 border-2 border-gray-300 rounded-md' onClick={() => { setSelectedSector(""); setFilteredData([]) }}>Reset</button>
      <Pie
        options={options}
        data={data2}
      />
    </div>
  )
}

export default PieChart