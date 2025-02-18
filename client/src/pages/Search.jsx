import React from 'react'

export default function Search() {
    return (
        <div className='md:min-h-[calc(100vh-5rem)] flex flex-col md:flex-row'>
            {/* for left side */}
            <div className='p-7 border-b-2 md:border-r-2  '>
                <form className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <lebel className=" font-semibold whitespace-nowrap">Search Term:</lebel>
                        <input type="text" id='searchTerm' name='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full outline-none' />

                    </div>

                    <div className='flex  gap-4 flex-wrap items-center'>
                        <lebel className="font-semibold">Type :</lebel>
                        <div class="checkbox-wrapper-46">
                            <input type="checkbox" id="all"
                                class="inp-cbx" />
                            <label for="all" class="cbx">
                                <span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Rent & Sale</span>
                            </label>

                        </div>

                        <div class="checkbox-wrapper-46">
                            <input type="checkbox" id="rent"
                                class="inp-cbx" />
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
                            <input type="checkbox" id="sale"
                                class="inp-cbx" />
                            <label for="sale" class="cbx">
                                <span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Sale</span>
                            </label>

                        </div>

                        <div class="checkbox-wrapper-46">
                            <input type="checkbox" id="offer"
                                class="inp-cbx" />
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


                    <div className='flex  gap-4 flex-wrap items-center'>
                        <lebel className="font-semibold">Amenities:</lebel>
                        <div class="checkbox-wrapper-46">
                            <input type="checkbox" id="furnished"
                                class="inp-cbx" />
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
                            <input type="checkbox" id="parking"
                                class="inp-cbx" />
                            <label for="parking" class="cbx">
                                <span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Parking</span>
                            </label>

                        </div>

                       


                    </div>


                    <div className='flex gap-4 items-center'>
                        <lebel className="font-semibold">Sort:</lebel>
                        <select id="sort_order" className='border p-3 rounded-lg outline-none'>
                            <option value="">Price high to low</option>
                            <option value="">Price low to high</option>
                            <option value="">Latest</option>
                            <option value="">Oldest</option>
                        </select>
                    </div>


                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>


                  



                </form>

            </div>
           




            {/* for right side */}
           <div className='p-3 mt-2'>
            <h1 className='text-gray-700 text-2xl md:text-3xl font-semibold'>Listing results...</h1>
           </div>



        </div>
    )
}
