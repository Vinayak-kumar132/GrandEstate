import React from "react";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord,setLandlord] = useState(null);
  const [message,setMessage] = useState('');


  const onChange=(e)=>{
  setMessage(e.target.value);

  }

  useEffect(() => {
    const fetchLandload = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        // console.log(data);
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandload();
  }, [listing.userRef]);

  return(
    <div>
        {landlord && (
            <div className="flex w-full  flex-col  gap-3">
                <p>Contact <span className="font-semibold underline ">{landlord.username}</span> for
                <span className="font-semibold"> 
                    <span> “</span>{listing.name.toLowerCase()}<span>”</span>
                    </span>
                    
                </p>
                <textarea onChange={onChange} name="message" id="message"
                 rows="2" value={message} placeholder="Enter your message here..."
                 className="w-full border outline-none p-3 rounded-lg"/>
                 <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} 
                 className="bg-slate-700 uppercase rounded-lg text-white text-center p-3 hover:opacity-95">
                 Send Message
                 </Link>
            </div>
        )}
    </div>
  )
}

