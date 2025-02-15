import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from "react-hot-toast";
import { app } from '../firebase';
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';

export default function CreateListing() {

    const [files, setFiles] = useState([]);
    // console.log("ye rhi files...",files);
    const [formData, setFormData] = useState({
        imageUrls: [],

    })
    const { currentUser, loading, error } = useSelector(state => state.user);
    const [uploading, setUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);

    console.log("This is formData..", formData);

    
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    
    if (!currentUser) {
        toast.error("User not authenticated!! please signin");
        return null; // or return <div>Please sign in</div>;
    }
    

    const handleImageSubmit = (e) => {
        
        try {
            if (files.length === 0) {
                toast.error("Please select a file first!");
                return;
            }

            if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
                setUploading(true);
                setImageUploadError(false);

                // we are uploading more than 1 images ,so we have more than 1 asynchronous behaviour,so we need to wait for all of them it will upload one by one  so it return more than one promise
                const promises = [];
                // All the download URLs is stored in the promises

                for (let i = 0; i < files.length; i++) {
                    promises.push(storeImage(files[i]));
                }
                Promise.all(promises).then((urls) => {
                    // setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                    setFormData(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...urls] }));

                    setImageUploadError(false);
                    setUploading(false);
                    setFiles([]); 


                });
            } else {
                setImageUploadError("You can only upload 6 images per listing");
                setUploading(false);
                toast.error("Image Limit exceeds!!")

            }
        } catch (error) {
            setImageUploadError("Image Upload failed");
            setUploading(false);
            toast.error("Image Upload failed");
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",

                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);

                },
                // here we ignore the process of uploading 
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    // All the download URLs is stored in the promises
                }
            )
        });
    }

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i != index),
        })
    }

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='font-semibold text-3xl text-center my-7'>Create a Listing</h1>

            <form className='flex flex-col gap-4 sm:flex-row'>

                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' className='border p-3 rounded-lg' required id='name' maxLength='62' minLength="10" />

                    <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' required id='description' />

                    <input type="text" placeholder='Address' className='border p-3 rounded-lg' required id='address' />


                    <div className='flex gap-6 flex-wrap mt-4'>
                        <div class="checkbox-wrapper-46">
                            <input type="checkbox" id="sell" class="inp-cbx" />
                            <label for="sell" class="cbx">
                                <span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Sell</span>
                            </label>
                        </div>

                        <div class="checkbox-wrapper-46">
                            <input type="checkbox" id="rent" class="inp-cbx" />
                            <label for="rent" class="cbx">
                                <span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Rent</span>
                            </label>
                        </div>


                        <div class="checkbox-wrapper-46">
                            <input type="checkbox" id="parking" class="inp-cbx" />
                            <label for="parking" class="cbx">
                                <span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Parking Spot</span>
                            </label>
                        </div>


                        <div class="checkbox-wrapper-46">
                            <input type="checkbox" id="furnished" class="inp-cbx" />
                            <label for="furnished" class="cbx">
                                <span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Furnished</span>
                            </label>
                        </div>


                        <div class="checkbox-wrapper-46">
                            <input type="checkbox" id="offer" class="inp-cbx" />
                            <label for="offer" class="cbx">
                                <span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Offer</span>
                            </label>
                        </div>


                    </div>

                    <div className='flex gap-6 flex-wrap mt-4'>

                        <div className=' flex items-center gap-2'>
                            <input type="number" id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg outline-none text-center'
                                onInput={(e) => {
                                    if (e.target.value > 10) e.target.value = 10;
                                }} />
                            <span>Beds</span>

                        </div>

                        <div className=' flex items-center gap-2'>
                            <input type="number" id='bathroom' min='1' max='10' required className='p-3 border border-gray-300 text-center rounded-lg outline-none'
                                onInput={(e) => {
                                    if (e.target.value > 10) e.target.value = 10;
                                }} />
                            <span>Bathroom</span>

                        </div>


                        <div className=' flex items-center gap-2'>
                            <input type="number" id='regularPrice' min='1' max='1000'
                                required
                                className='p-3 border border-gray-300 text-center rounded-lg outline-none'
                            />
                            <div className='flex flex-col'>
                                <span>Regular price</span>
                                <span className='opacity-60 text-xs'>($/month)</span>
                            </div>


                        </div>

                        <div className=' flex items-center gap-2'>
                            <input type="number" id='discountedPrice' min='1' max='1000'
                                required
                                className='p-3 border border-gray-300 text-center rounded-lg outline-none'
                            />
                            <div className='flex flex-col'>
                                <span>Discounted price</span>
                                <span className='opacity-60 text-xs'>($/month)</span>
                            </div>

                        </div>

                    </div>

                </div>


                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>


                    <div className='flex gap-4'>
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            className='p-3 border border-gray-300 rounded w-full ' type="file" id="images" accept="image/*" multiple />

                        <button disabled={uploading}
                            type="button" // it mention because it is inside the form now by uploading the picture it will not subit form
                            onClick={handleImageSubmit}
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? "Uploading..." : "upload"}</button>


                    </div>
                    <p className='text-red-700 text-small'>{imageUploadError && imageUploadError}</p>

                    {
                        formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div key={url} className="flex justify-between p-3 border border-gray-400 items-center rounded-lg">
                                <img  src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />

                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    type="button" className='p-3 text-red-700 uppercase font-semibold hover:opacity-75'>Delete</button>
                            </div>
                        ))
                    }


                    <button
                        className='bg-gray-700 hover:opacity-95 text-white uppercase disabled:opacity-80 rounded-lg p-3 mt-2'
                    >Create listing</button>

                </div>




            </form>


        </main>
    )
}

