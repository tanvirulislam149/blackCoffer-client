import React from 'react'
import { FaUserCircle, FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-purple-600 flex justify-between items-center px-16 py-4 text-white sticky top-0">
      <div>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
      </div>
      <div className='flex'>
        <FaBell className='w-8 h-8 mr-5' />
        <FaUserCircle className='w-8 h-8' />
      </div>
    </div>
  )
}

export default Navbar