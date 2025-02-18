import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {

    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    })
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const handleChange = (e) => {
        if (
            e.target.id === "all" ||
            e.target.id === "rent" ||
            e.target.id === "sale"
        ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
        }

        if (e.target.id === "searchTerm") {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }

        if (
            e.target.id === "parking" ||
            e.target.id === "furnished" ||
            e.target.id === "offer"
        ) {
            setSidebardata({
                ...sidebardata,
                [e.target.id]:
                    e.target.checked || e.target.checked === "true" ? true : false,
            });
        }

        if (e.target.id === "sort_order") {
            const sort = e.target.value.split("_")[0] || "created_at";

            const order = e.target.value.split("_")[1] || "desc";

            setSidebardata({ ...sidebardata, sort, order });
        }
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        const typeFromUrl = urlParams.get("type");
        const parkingFromUrl = urlParams.get("parking");
        const furnishedFromUrl = urlParams.get("furnished");
        const offerFromUrl = urlParams.get("offer");
        const sortFromUrl = urlParams.get("sort");
        const orderFromUrl = urlParams.get("order");
    
        if (
          searchTermFromUrl ||
          typeFromUrl ||
          parkingFromUrl ||
          furnishedFromUrl ||
          offerFromUrl ||
          sortFromUrl ||
          orderFromUrl
        ) {
          setSidebardata({
            //URL is string that is why we add url
            searchTerm: searchTermFromUrl || "",
            type: typeFromUrl || "all",
            parking: parkingFromUrl === "true",
            furnished: furnishedFromUrl === "true",
            offer: offerFromUrl === "true",
            sort: sortFromUrl || "created_at",
            order: orderFromUrl || "desc",
          });
        }
    
        const fetchListings = async () => {
          try {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
              setShowMore(true);
            }
            else{
                setShowMore(false);
            }
            setListings(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching listings:", error);
            setLoading(false);
          }
        };
        fetchListings();
      }, [location.search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", sidebardata.searchTerm);
        urlParams.set("type", sidebardata.type);
        urlParams.set("parking", sidebardata.parking);
        urlParams.set("furnished", sidebardata.furnished);
        urlParams.set("offer", sidebardata.offer);
        urlParams.set("sort", sidebardata.sort);
        urlParams.set("order", sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };



    return (
        <div className='md:min-h-[calc(100vh-5rem)] flex flex-col md:flex-row'>
            {/* for left side */}
            <div className='p-7 border-b-2 md:border-r-2  '>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <lebel className=" font-semibold whitespace-nowrap">Search Term:</lebel>
                        <input type="text" id='searchTerm' name='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full outline-none'
                            value={sidebardata.searchTerm}
                            onChange={handleChange} />

                    </div>

                    <div className='flex  gap-4 flex-wrap items-center'>
                        <lebel className="font-semibold">Type :</lebel>
                        <div class="checkbox-wrapper-46">
                            <input type="checkbox" id="all" class="inp-cbx"
                                checked={sidebardata.type === 'all'}
                                onChange={handleChange}
                            />
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
                                class="inp-cbx"
                                checked={sidebardata.type === 'rent'}
                                onChange={handleChange}
                            />
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
                                class="inp-cbx"
                                checked={sidebardata.type === 'sale'}
                                onChange={handleChange} />
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
                                class="inp-cbx"
                                checked={sidebardata.offer}
                                onChange={handleChange} />
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
                                class="inp-cbx"
                                checked={sidebardata.furnished}
                                onChange={handleChange} />
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
                                class="inp-cbx"
                                checked={sidebardata.parking}
                                onChange={handleChange} />
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
                        <select

                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            id="sort_order" className='border p-3 rounded-lg outline-none'>
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
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
