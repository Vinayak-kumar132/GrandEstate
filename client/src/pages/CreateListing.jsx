import React from 'react'

export default function CreateListing() {
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
                            <input type="number" id='regularPrice'  min='1' max='1000'
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
                        <input className='p-3 border border-gray-300 rounded w-full ' type="file" id="images" accept="image/*" multiple />

                        <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>

                    </div>

                    <button
                className='bg-gray-700 hover:opacity-95 text-white uppercase disabled:opacity-80 rounded-lg p-3 mt-2'
                >Create listing</button>
                   
                </div>

                


            </form>


        </main>
    )
}

