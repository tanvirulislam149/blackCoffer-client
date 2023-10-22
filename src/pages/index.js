import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LineChart from '../../Components/LineChart'
import Navbar from '../../Components/Navbar'
import BarChart from '../../Components/BarChart'
import PieChart from '../../Components/PieChart'
import { Oval } from 'react-loader-spinner'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://blackcoffer-server.onrender.com/chartData')
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      })
  }, [])

  return (
    <main className={`min-h-screen bg-slate-100 p-5 ${montserrat.className}`}>
      {
        loading ?
          <div className='flex flex-col justify-center items-center h-96 mt-20'>
            <div>
              <Oval
                height={50}
                width={50}
                color="black"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="lightgray"
                strokeWidth={8}
                strokeWidthSecondary={8}
              />
            </div>
            <div>
              <p className='text-xl font-bold mt-3'>Loading...</p>
            </div>
          </div>
          :
          <>
            <LineChart data={data} />
            <BarChart data={data} />
            <PieChart data={data} />
          </>
      }
    </main>
  )
}
