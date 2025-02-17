import React from 'react'
import error from '../asset/error.svg'
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className='bg-gray-300 flex items-center w-full justify-center -mt-20 h-screen gap-16 mx-auto'>
      <div className='flex flex-col place-items-start gap-4 flex-wrap w-[412px]'>
        <p className='text-black text-3xl font-semibold'>Oops! The page you were looking for doesn’t exist.</p>

        <p className='text-black'>You may have mistyped the address or the page may have moved.</p>

        
        <Link to="/" className=" bg-gray-700 text-white hover:bg-gray-300 shadow-lg hover:shadow-gray-700 hover:text-gray-700 duration-200 border-gray-500 border-2 px-4 py-3 rounded-lg font-semibold
        ">
          Back to Homepage
        </Link>
        

      </div>

      <div className='hidden md:block'>
        <img src={error} alt="errorLogo" loading='lazy' className='' />
      </div>


    </div>
  )
}

export default Error