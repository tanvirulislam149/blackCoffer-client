import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LineChart from '../../Components/LineChart'

const inter = Inter({ subsets: ['latin'] })

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
    <main
      className={`flex min-h-screen p-14 ${inter.className}`}
    >
      <LineChart data={data} />
    </main>
  )
}
