import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LineChart from '../../Components/LineChart'
import Navbar from '../../Components/Navbar'
import BarChart from '../../Components/BarChart'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://blackcoffer-server.onrender.com/chartData')
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  return (
    <main className={`min-h-screen bg-slate-100 p-5 ${montserrat.className}`}>
      <LineChart data={data} />
      <BarChart data={data} />
    </main>
  )
}
