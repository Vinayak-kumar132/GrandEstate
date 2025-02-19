import React from 'react'
import { ImPencil } from "react-icons/im";

export default function About() {
  return (
    <div className='h-[calc(100vh-5rem)] flex justify-center p-2 '>
      <div className='my-auto max-w-3xl mx-auto bg-blue-50 p-14 flex flex-col gap-8 rounded-xl shadow-2xl'>
      <div className='text-2xl flex items-center whitespace-nowrap sm:text-3xl text-slate-700 font-bold'>About Grand Estate... 
      <ImPencil className='text-blue-900 w-6' />
      </div>



      <p className='text-slate-600 italic'>Grand Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</p>


      <p className='text-slate-600 italic'>Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.</p>


      <p className='text-slate-600 italic'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
    </div>
    </div>
  )
}
