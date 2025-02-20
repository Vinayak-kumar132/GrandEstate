import React, { useEffect ,useState } from 'react'
import { FaSearch } from "react-icons/fa";
import {Link,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux';


export default function Header() {
   
  const {currentUser}=useSelector(state=>state.user);
  const [searchTerm,setSearchTerm]=useState('');
  const navigate=useNavigate();
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);

  }

  useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search);
    const searchTermFromURL =urlParams.get('searchTerm');

    if(searchTermFromURL){
      setSearchTerm(searchTermFromURL);
    }

  },[location.search]);

  return (
    <header className='bg-slate-200 shadow-md fixed top-0 w-full z-50'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to="/">
        <h1 className='sm:font-extrabold font-grechen font-bold sm:scale-105 md:scale-110 lg:scale-150 text-md sm:text-2xl flex flex-row'>
          <span className='text-slate-500'>Grand</span>
          <span className='text-slate-700'>Estate</span>
        </h1>
        </Link>




        <form 
        onSubmit={handleSubmit}
        className='bg-slate-100 py-3 px-6 rounded-3xl flex items-center  border-2 border-opacity-10 border-gray-800 shadow-xl '>
          <input
            type="text" placeholder='Search...' className='bg-transparent outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}

          />
          <button
          
          className='hover:animate-pulse'>
          <FaSearch className='text-slate-600'/>
          </button>
          
        </form>




        <ul className='flex gap-4 items-center font-semibold '>
          <Link to="/">
          <li className='hidden sm:inline text-slate-700 hover:text-yellow-800 cursor-pointer select-none'>Home</li></Link>
          
          <Link to="about">
          <li className='hidden sm:inline text-slate-700 hover:text-yellow-800 cursor-pointer select-none'>About</li>
          </Link>
          
          <Link to="/profile">
          {
            currentUser?(<img className='rounded-full h-8 w-8 sm:h-9 sm:w-9 object-cover border-2 hover:border-yellow-800 border-gray-600 
             p-[1px] bg-gray-200' src={currentUser?.avatar || currentUser?.validUser?.avatar} loading='lazy' alt="profile"/>):
            (<li className='text-slate-700 hover:text-yellow-800 text-sm sm:text-base cursor-pointer whitespace-nowrap select-none'>Sign in</li>)
          }
          </Link>
        </ul>
      </div>
    </header>
  )
}
