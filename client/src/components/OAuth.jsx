import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import icon from '../asset/googleicn.svg'


export default function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();

  const handleGoogleClick=async()=>{
    try{
        const provider=new GoogleAuthProvider();
        const auth=getAuth(app);

        const result=await signInWithPopup (auth,provider);

        // console.log(result);
        const res = await fetch('/api/auth/google',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}),
        })
        const data=await res.json();
        dispatch(signInSuccess(data));
        toast.success("Login Successfull");
        navigate("/");

    }catch(error){
      console.log("could not sign in with google",error);
    }
  }


  return (
    // it is submit by default we have changed it to button
    <button onClick={handleGoogleClick} type="button" className='bg-blue-100 hover:bg-blue-200 border-2 border-blue-200 text-white py-2 px-3 transition-all duration-200 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex gap-6 items-center justify-center'>
        
         <img src={icon} alt="logo" loading='lazy' className='w-[30px]' />
        <p className='text-black font-semibold'>Continue with google</p>
    </button>
  )
}
