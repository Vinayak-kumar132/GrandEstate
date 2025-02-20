import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import Contact from "../components/Contact";


import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from "react-icons/fa";



export default function Listing() {
    SwiperCore.use([Navigation]);

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(false);

    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);

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
            {error && <p className='flex text-center items-center justify-center -mt-20 h-screen font-serif text-2xl font-semibold bg-slate-300 opacity-80'>Something Went Wrong . . .</p>}

            {listing && !loading && !error && (
                <div className='max-w-6xl mx-auto p-2'>
                    <Swiper modules={[Navigation, Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        className="custom-swiper"
                        navigation autoplay={{ delay: 3000, disableOnInteraction: false }} loop={true}>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className="h-[450px]  mt-1 rounded-lg"
                                    style={{
                                        background: `url(${url}) center no-repeat`,
                                        backgroundSize: "cover",

                                    }}
                                    onMouseEnter={(e) => e.target.closest(".swiper").swiper.autoplay.stop()} // Pause on hover
                                    onMouseLeave={(e) => e.target.closest(".swiper").swiper.autoplay.start()} // Resume when mouse leaves
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>




                    <div className="flex flex-start flex-col max-w-6xl mx-auto p-3 my-7 gap-4">
                        <p className="text-2xl font-bold opacity-80">
                            {listing.name} - ${" "}
                            {listing.offer
                                ? listing.discountPrice.toLocaleString("en-US")
                                : listing.regularPrice.toLocaleString("en-US")}
                            {listing.type === "rent" && " / month"}
                        </p>
                        <p className="flex items-center mt-4 gap-2 text-slate-600  text-md">
                            <FaMapMarkerAlt className="animate-pulse text-green-700" />
                            {listing.address}
                        </p>
                        <div className="flex gap-4">
                            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-2 rounded-md">
                                {listing.type === "rent" ? "For Rent" : "For Sale"}
                            </p>
                            {listing.offer && (
                                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                                    ${+listing.regularPrice - +listing.discountPrice} OFF
                                </p>
                            )}
                        </div>
                        <p className="text-slate-800">
                            <span className="font-semibold text-black">Description - </span>
                            {listing.description}
                        </p>
                        <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                            <li className="flex items-center gap-1 whitespace-nowrap ">
                                <FaBed className="text-lg" />
                                {listing.bedrooms > 1
                                    ? `${listing.bedrooms} beds `
                                    : `${listing.bedrooms} bed `}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap ">
                                <FaBath className="text-lg" />
                                {listing.bathrooms > 1
                                    ? `${listing.bathrooms} baths `
                                    : `${listing.bathrooms} bath `}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap ">
                                <FaParking className="text-lg" />
                                {listing.parking ? "Parking spot" : "No Parking"}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap ">
                                <FaChair className="text-lg" />
                                {listing.furnished ? "Furnished" : "Unfurnished"}
                            </li>
                        </ul>
                        {currentUser && listing.userRef !== currentUser._id && !contact && (
                            <button
                                onClick={() => setContact(true)}
                                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                            >
                                Contact landlord
                            </button>
                        )}

                        {contact && <Contact listing={listing} />}


                        {!currentUser && (
                            <Link to="/sign-in"

                                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 max-w-md p-3 text-center shadow-lg shadow-gray-500"
                            >
                                Signin to continue
                            </Link>
                        )}

                    </div>


                </div>
            )}

        </main>
    )
}



