import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  const {currentUser}=useSelector(state=>state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4'>
         <img src={currentUser.avatar} alt="profile" className='rounded-3xl border-4 border-gray-700 h-24 w-24 p-[1px] cursor-pointer bg-white self-center mt-2' />

         <input
          className="border p-3 rounded-lg outline-none"
          id="username"
          type="text"
          placeholder="Username"
          
        />
        <input
          className="border p-3 rounded-lg outline-none"
          id="email"
          type="text"
          placeholder="Email"
         
        />
        <input
          className="border p-3 rounded-lg outline-none"
          id="password"
          type="password"
          placeholder="Password"
          
          />

          <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
           >Update</button>

      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>

        <span className='text-red-700 cursor-pointer'>Sign out </span>
      </div>
    </div>
  )
}
