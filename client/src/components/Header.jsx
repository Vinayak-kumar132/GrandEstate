import React from 'react'
import { FaSearch } from "react-icons/fa";
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux';


export default function Header() {
   
  const {currentUser}=useSelector(state=>state.user);


  return (
    <header className='bg-slate-200 shadow-md fixed top-0 w-full z-50'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
        <h1 className='font-bold text-sm sm:text-xl flex flex-row'>
          <span className='text-slate-500'>Grand</span>
          <span className='text-slate-700'>Estate</span>
        </h1>
        </Link>

        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input
            type="text" placeholder='Search...' className='bg-transparent outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-slate-600'/>
        </form>
        <ul className='flex gap-4 items-center font-semibold '>
          <Link to="/">
          <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer select-none'>Home</li></Link>
          
          <Link to="about">
          <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer select-none'>About</li>
          </Link>
          
          <Link to="/profile">
          {
            currentUser?(<img className='rounded-full h-9 w-9 object-cover border-2 border-gray-600 
             p-[1px] bg-gray-200' src={currentUser?.avatar || currentUser?.validUser?.avatar} loading='lazy' alt="profile"/>):
            (<li className='text-slate-700 hover:underline cursor-pointer select-none'>Sign in</li>)
          }
          </Link>
        </ul>
      </div>
    </header>
  )
}
