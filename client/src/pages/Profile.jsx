import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserfailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,signOutUserStart,signOutUserSuccess,signOutUserFailure } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux';


export default function Profile() {
  const { currentUser,loading,error } = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

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

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser?.validUser?._id || currentUser?._id}`,{
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success('Account Deleted Successfully.', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  signOutUserSuccess
  const handleSignOut=async ()=>{
    try{
      dispatch(signOutUserStart());
       const res=await fetch('/api/auth/signout');
       const data=await res.json();
       if(data.success===false){
        dispatch(signOutUserFailure(data.message));
        toast.error(data.message);
        return;
       }
       dispatch(signOutUserSuccess(data));
       toast.success("logged out");
    }catch(error){
      dispatch(signOutUserFailure("Internal Server error"));
    }
  }
  
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refreshing the page
    // console.log(formData);
    // console.log(currentUser);
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser?.validUser?._id || currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),

      });
      const data = await res.json();
      // console.log(" Updated user ka response..",data);
      if (data.success === false) {
        // toast.error("Couldn't Update the User");
        toast.error(data.message);

        dispatch(updateUserfailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));

      toast.success("Profile Updated Successfull");
      

    } catch (error) {
      dispatch(updateUserfailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser?.avatar || currentUser?.validUser?.avatar} alt="profile" className='rounded-3xl border-4 border-gray-700 h-24 w-24 p-[1px] cursor-pointer bg-white self-center mt-2 object-cover' />

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

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...':'Update'}</button>
      </form>

      <div className='flex justify-between mt-5'>
        <button onClick={handleDeleteUser} className='text-red-800  font-semibold hover:text-red-500 cursor-pointer'>Delete account</button>
        <span onClick={handleSignOut}  className='text-red-800 cursor-pointer font-semibold hover:text-red-500'>Sign out</span>
      </div>
    </div>
  );
}

