// import React, { useState ,useEffect} from 'react'
// import { useSelector } from 'react-redux';
// import { useRef } from 'react';
// import {getStorage,ref,getDownloadURL, uploadBytesResumable} from 'firebase/storage';
// import {app} from '../firebase'

// export default function Profile() {
//   // allow read;
//   //     allow write: if
//   //        request. resource.size < 2 * 1024 * 1024 &&
//   //        request.resource.contentType.matches(' image/.*')


//   const {currentUser}=useSelector(state=>state.user);
//   const fileRef=useRef(null);
//   const[file,setFile]=useState(undefined);
//   const [filePerc, setFilePerc] = useState(0);
//   const [fileUploadError, setFileUploadError] = useState(false);
//   const [formData, setFormData] = useState({});
//   // console.log(file);
//   // console.log(filePerc);

//   useEffect(()=>{
//     if(file){
//       handleFileUpload(file);
//     }
//   },[file]); // ye dubara setFile() pe re render hogi

//   const handleFileUpload =(file)=>{
//       const storage=getStorage(app);
//       //It will always give a new filename even if we uploading the same due to time difference
//       const fileName=new Date().getTime()+file.name;
//       const storageRef=ref(storage,fileName);
//       const uploadTask=uploadBytesResumable(storageRef,file);
   
     
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => { // snapshot is callback
//           // progress chnage hoti rahegi kyuki data chunks me upload hota h firebase me
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setFilePerc(Math.round(progress)); // It cause re-render
//           console.log('Upload is ' + Math.round(progress) + "% done"); // Fix: Use Math.round() directly
//         },
//         (error) => {
//           console.error("Upload failed:", error);
//           setFileUploadError(true);
//         },

//         () => {
          
//           //uploadTask.snapshot.ref is the actual reference pointing to this file.
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//             setFormData({ ...formData, avatar: downloadURL })
//           );
//           // yha formdata ke avatar field ko downloadURL se update kr rhe h 
//         }
//       );
      
      
//   };
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);  // Ye backend ko send karne ke liye modify karo
//   };
 

//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
      
//       <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
//         <input
//         onChange={(e)=>setFile(e.target.files[0])}
//         type="file" ref={fileRef} hidden accept='image/*' />
//          <img onClick={()=>fileRef.current.click()}  src={currentUser?.avatar || currentUser?.validUser?.avatar} alt="profile" className='rounded-3xl border-4 border-gray-700 h-24 w-24 p-[1px] cursor-pointer bg-white self-center mt-2' />
        

//          <p className="text-sm self-center">
//           {fileUploadError ? (
//             <span className="text-red-700">
//               Error Image Upload(image must be less than 2 mb)
//             </span>
//           ) : filePerc > 0 && filePerc < 100 ? (
//             <span className="text-slate-700">{`uploading ${filePerc}%`}</span>
//           ) : filePerc === 100 ? (
//             <span className="text-green-700">Image successfully uploaded!</span>
//           ) : (
//             ""
//           )}
//         </p>

//          <input
//           className="border p-3 rounded-lg outline-none"
//           id="username"
//           type="text"
//           placeholder="Username"
//           defaultValue={currentUser.username}
//           onChange={handleChange}
          
//         />
//         <input
//           className="border p-3 rounded-lg outline-none"
//           id="email"
//           type="text"
//           placeholder="Email"
//           defaultValue={currentUser.email}
//           onChange={handleChange}
         
//         />
//         <input
//           className="border p-3 rounded-lg outline-none"
//           id="password"
//           type="password"
//           placeholder="Password"
          
//           />

//           <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
//            >Update</button>

//       </form>

//       <div className='flex justify-between mt-5'>
//         <span className='text-red-700 cursor-pointer'>Delete account</span>

//         <span className='text-red-700 cursor-pointer'>Sign out </span>
//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  
  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser && currentUser?.email && currentUser?.password) {
      signInWithEmailAndPassword(auth, currentUser.email, currentUser.password)
        .then((userCredential) => {
          console.log("Authenticated in Firebase:", userCredential.user);
        })
        .catch((error) => {
          console.error("Firebase authentication failed:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    try {
      const storage = getStorage(app);
      //It will always give a new filename even if we uploading the same due to time difference
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {// snapshot is callback
          // progress chnage hoti rahegi kyuki data chunks me upload hota h firebase me
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
          console.log("Upload is " + Math.round(progress) + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
          setFileUploadError(true);
        },
        async () => {
          //uploadTask.snapshot.ref is the actual reference pointing to this file.
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData({ ...formData, avatar: downloadURL });
          // yha formdata ke avatar field ko downloadURL se update kr rhe h 
        }
      );
    } catch (error) {
      console.error("Error in file upload:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
      
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar||currentUser?.avatar || currentUser?.validUser?.avatar} alt="profile" className='rounded-3xl border-4 border-gray-700 h-24 w-24 p-[1px] cursor-pointer bg-white self-center mt-2 object-cover' />
        
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload(image must be less than 2MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          className="border p-3 rounded-lg outline-none"
          id="username"
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username || currentUser.validUser.username}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg outline-none"
          id="email"
          type="text"
          placeholder="Email"
          defaultValue={currentUser.email || currentUser.validUser.email}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg outline-none"
          id="password"
          type="password"
          placeholder="Password"
        />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
}

