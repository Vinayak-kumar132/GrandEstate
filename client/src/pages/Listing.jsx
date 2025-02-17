import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation,Pagination,Autoplay } from "swiper/modules";
import "swiper/css/bundle";



export default function Listing() {
    SwiperCore.use([Navigation]);

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();

                if (data.success === false) {
                    setLoading(false);
                    setError(true);
                    return;
                }

                setListing(data);
                setLoading(false);

            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }

        fetchListing();
    }, [params.listingId]);


    return (
        <main>
            {loading && <Spinner />}
            {error && <p className='text-center my-auto text-2xl'>Something Went wrong</p>}

            {listing && !loading && !error && (
                <div className='max-w-6xl mx-auto p-2'>
                    <Swiper modules={[Navigation,Pagination,Autoplay]} navigation autoplay={{ delay: 3000 }}>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className="h-[550px]  mt-10 rounded-lg"
                                    style={{
                                        background: `url(${url}) center no-repeat`,
                                        backgroundSize: "cover",
                                        
                                    }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                   
                   <div>

                   </div>


                </div>
            )}

        </main>
    )
}



