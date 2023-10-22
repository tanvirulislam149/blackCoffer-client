import React, { useState } from 'react'
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
  const [selectedStartYear, setSelectedStartYear] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");
  const [filteredData, setFilterData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topicFilteredData, setTopicFilteredData] = useState([]);

  const uniqueData = data.filter((obj, index) => {  // removing elements that have the same topic name and elements that don't have a topic name, start year and end year.
    const result = index === data.findIndex(o => obj.topic === o.topic) && obj.topic !== "" && obj.start_year !== "" && obj.end_year !== ""
    return result;
  });
  const startYearArray = ((uniqueData.map(d => d.start_year)).filter((x, i, a) => a.indexOf(x) == i)).sort();
  const endYearArray = ((uniqueData.map(d => d.end_year)).filter((x, i, a) => a.indexOf(x) == i)).sort();
  const topicArray = uniqueData.map(d => d.topic)

  const handleTopicFilter = () => {
    const data = uniqueData.filter(d => d.topic === selectedTopic);
    setTopicFilteredData(data);
  }

  const handleFilter = () => {
    const data = uniqueData.filter(d => d.start_year >= `${Number(selectedStartYear)}` && d.end_year <= `${Number(selectedEndYear)}`);
    setFilterData(data);
  }


  const handleReset = () => {
    setSelectedStartYear("");
    setSelectedEndYear("");
    setFilterData([]);
  }


  const ChartData = {
    datasets: [
      {
        label: "Start Year",
        data: filteredData.length ? filteredData : topicFilteredData.length ? topicFilteredData : uniqueData,
        backgroundColor: "rgba(63, 255, 25, 0.5)",
        fill: true,
        parsing: {
          xAxisKey: 'topic',
          yAxisKey: 'start_year'
        }
      },
      {
        label: "End Year",
        data: filteredData.length ? filteredData : topicFilteredData.length ? topicFilteredData : uniqueData,
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
      }
    },
  };
  return (
    <div className='w-4/5 h-4/5 mx-auto border-2 my-10 border-neutral-300 rounded-lg bg-white p-10'>
      <p className='text-2xl font-medium'>Bar Chart</p>
      <p className='text-sm pb-5'>Showing start year and end year according to Topic</p>
      <select defaultValue={"default"} value={selectedStartYear} onChange={(e) => setSelectedStartYear(e.target.value)} className='border-2 border-gray-300 px-1 py-1 mr-4 rounded' name="startYear" id="startYear">
        <option value="default">Select start year</option>
        {startYearArray.map((y, index) => <option key={index} value={y}>{y}</option>)}
      </select>
      <select defaultValue={"default"} value={selectedEndYear} onChange={(e) => setSelectedEndYear(e.target.value)} className='border-2 border-gray-300 px-1 py-1 mr-4 rounded' name="endYear" id="endYear">
        <option value="default">Select end year</option>
        {endYearArray.map((y, index) => <option key={index} value={y}>{y}</option>)}
      </select>
      <button className='px-4 mr-4 py-1 border-2 border-gray-300 rounded-md' onClick={() => handleFilter()}>Filter</button>
      <button className='px-4 py-1 border-2 border-gray-300 rounded-md' onClick={() => handleReset()}>Reset</button>
      <br />
      <select defaultValue={"default"} value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className='my-3 border-2 w-40 border-gray-300 px-1 py-1 rounded' name="startYear" id="startYear">
        <option value="default">Select topic</option>
        {topicArray.map((y, index) => <option key={index} value={y}>{y}</option>)}
      </select>
      <button className='px-4 mx-4 py-1 border-2 border-gray-300 rounded-md' onClick={() => handleTopicFilter()}>Filter</button>
      <button className='px-4 py-1 border-2 border-gray-300 rounded-md' onClick={() => { setTopicFilteredData([]); setSelectedTopic("") }}>Reset</button>
      <Bar options={options} data={ChartData} />
    </div>
  )
}

export default BarChart