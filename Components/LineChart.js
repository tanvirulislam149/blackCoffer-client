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
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { AiOutlineArrowDown } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const LineChart = ({ data }) => {
  const [selectedData, setSelectedData] = useState([]);
  const [filteredData, setFilterData] = useState([]);

  const uniqueData = data.filter((obj, index) => {  // removing elements that have the same country name and elements that don't have a country name
    const result = index === data.findIndex(o => obj.country === o.country) && obj.country !== ""
    return result;
  });

  const handleFilter = () => {
    let array = [];
    for (let i = 0; i < selectedData.length; i++) {
      const data = uniqueData.filter(d => d.country === `${selectedData[i]}`)
      array.push(data[0]);
    }
    setFilterData(array);
  }

  const ChartData = {
    datasets: [
      {
        label: "Relevance",
        data: filteredData.length ? filteredData : uniqueData,
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
        data: filteredData.length ? filteredData : uniqueData,
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
          text: "Country",
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
  const handleData = (data) => {
    setSelectedData([...selectedData, data])
  }
  return (
    <div className='w-4/5 h-4/5 mx-auto border-2 border-neutral-300 rounded-lg bg-white p-10'>
      <p className='text-2xl font-medium'>Line Chart</p>
      <p className='text-sm pb-5'>Showing Likelihood and Relevance according to country</p>
      <Listbox value={selectedData}>
        {({ open }) => (
          <>
            {/* <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Listbox.Label> */}
            <div className="mt-2">
              <div className='flex mb-4'>
                <Listbox.Button className="cursor-default flex w-5/6 overflow-x-auto justify-between items-center rounded-md bg-white py-1.5 pl-1 pr-1 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    {/* <img src={selectedData.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                    <span className="ml-3 block truncate">{selectedData.length ? selectedData.map((s, index) => `${s}${selectedData.length === (index + 1) ? "" : ", "}`) : "Select more than 2 countries to filter"}</span>
                  </span>
                  <span className="pointer-events-none inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <AiOutlineArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <button className='mx-4 px-4 py-1 border-2 border-gray-300 rounded-md' onClick={() => handleFilter()}>Filter</button>
                <button className='px-4 py-1 border-2 border-gray-300 rounded-md' onClick={() => { setSelectedData([]); setFilterData([]) }}>Reset</button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {uniqueData.map((data) => (
                    <Listbox.Option
                      key={data._id}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={data.country}
                      onClick={() => handleData(data.country)}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            {/* <img src={data.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {data.country}
                            </span>
                          </div>

                          {(selectedData.filter(s => s === data.country)).length ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <TiTick className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      <Line
        options={options}
        data={ChartData}
      />
    </div>
  )
}

export default LineChart