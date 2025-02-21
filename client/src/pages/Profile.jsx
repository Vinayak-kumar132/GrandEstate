import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserfailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,signOutUserStart,signOutUserSuccess,signOutUserFailure } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux';


export default function Profile() {
  const { currentUser,loading,error } = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showListingError,setShowListingError]=useState(false);
  const [formData, setFormData] = useState({});
  const[showLoading,setShowLoading]=useState(false);
  const [userListings, setUserListings] = useState([]);
  const [openList,setOpenList]=useState(false);


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
    
  
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your account!",
      icon: "warning",
      scrollbarPadding: false ,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(deleteUserStart());
  
          const res = await fetch(`/api/user/delete/${currentUser?.validUser?._id || currentUser?._id}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("Failed to delete user");
          }
  
          const data = await res.json(); // `await` lagana zaroori hai
  
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
  
          dispatch(deleteUserSuccess(data));
  
          Swal.fire("Deleted!", "Your account has been deleted.", "success");
  
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

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

  const handleShowListings=async (e)=>{
     if(!openList){
      try{
        setShowListingError(false);
        setShowLoading(true);
        const res=await fetch(`/api/user/listings/${currentUser._id}`);
        if (!res.ok) throw new Error("Failed to fetch listings"); 
        const data =await res.json();
        if(data.success===false){
          setShowListingError(true);
          return;
        }
        setUserListings(data);
        setShowLoading(false);
        setOpenList(true);
  
  
      }catch(error){
        setShowListingError(true);
        setShowLoading(false);
      }
      

     }
     else{
      setUserListings([]);
      setOpenList(false);
     }



    
  }

  const handleListingDelete = async (listingId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      scrollbarPadding: false ,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setUserListings((prev) =>
          prev.filter((listing) => listing._id !== listingId)
        );
        Swal.fire("Deleted!", "Your listing has been deleted.", "success");
      } catch (error) {
        console.log(error.message);
      }
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

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 font-semibold uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...':'Update'}</button>

        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase font-semibold text-center hover:opacity-95  border border-green-600"  to={"/create-listing"}>
        Create Listing
      </Link>

      </form>

      

      <div className='flex justify-between mt-5'>
        <button onClick={handleDeleteUser} className='text-red-800  font-semibold hover:text-red-500 cursor-pointer'>Delete account</button>
        <span onClick={handleSignOut}  className='text-red-800 cursor-pointer font-semibold hover:text-red-500'>Sign out</span>
      </div>

       <button disabled={showLoading} onClick={handleShowListings} className='text-green-700 w-full hover:text-green-600 font-semibold mt-2'>{openList ? "Hide Listing":"Show Listing"}</button>
       <p className='text-red-900 mt-5 flex justify-center italic text-sm'>{showListingError ?"No listing found...":""}</p>

       {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border border-slate-400 rounded-lg flex justify-between p-3 items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link to={`/listing/${listing._id}`} className="flex-1">
                <p className="text-slate-700 font-semibold  hover:underline truncate">
                  {listing.name}
                </p>
              </Link>
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}


    </div>
  );
}

