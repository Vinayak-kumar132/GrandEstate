import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import ListingItem from "../components/ListingItem";
import { FaSquareFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("api/listing/get?offer=true&limit=4");
        const data = await res.json();
        // console.log("Offer Listings:", data); // Debugging API response
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.error("Error fetching offer listings:", error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("api/listing/get?type=rent&limit=4");
        const data = await res.json();
        // console.log("Rent Listings:", data);
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.error("Error fetching rent listings:", error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("api/listing/get?type=sale&limit=4");
        const data = await res.json();
        // console.log("Sale Listings:", data);
        setSaleListings(data);
      } catch (error) {
        console.error("Error fetching sale listings:", error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className='flex flex-col mx-auto gap-6 max-w-6xl p-28 px-3'>
        <div className='text-3xl lg:text-6xl font-bold text-slate-700'>
          <h1>
            Find your next <span className='text-slate-500'>perfect</span>
            <br /> place with ease
          </h1>
        </div>

        <p className='text-sm text-gray-500'>
          GrandEstate will help you find your home fast, easy, and comfortable.
          <br />
          Our expert support is always available.
        </p>

        <p className='font-bold text-xs sm:text-sm text-blue-800 hover:text-blue-600'>
          <Link to='/search'>Let's Start now...</Link>
        </p>
      </div>

      {/* Swiper */}
      <div className="max-w-7xl mx-auto rounded-lg">

        {offerListings && offerListings.length > 0 &&
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
          >
            {offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls?.[0] || ""}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className='h-[700px] rounded-xl'
                  onMouseEnter={(e) => e.target.closest(".swiper")?.swiper?.autoplay?.stop?.()}
                  onMouseLeave={(e) => e.target.closest(".swiper")?.swiper?.autoplay?.start?.()}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        }


      </div>


      {/* last section */}
      <div className="max-w-6xl p-4 flex flex-col mx-auto gap-20 ">
         {offerListings && offerListings.length > 0 && (
          <div className="flex flex-col gap-2 mx-auto lg:ml-16">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl text-slate-700 font-mono font-semibold">
                Recent Offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-blue-700 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="flex flex-col gap-2 mx-auto">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl text-slate-700 font-mono font-semibold">
                Recent places for rent
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-blue-700 hover:underline"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="flex flex-col gap-2 mx-auto">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl text-slate-700  font-mono font-semibold">
                Recent places for sale
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-blue-700 hover:underline"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>


      {!currentUser && (
        <div className="mt-[100px] flex justify-center">
          <Link to="/sign-in"

            className="bg-slate-700 hover:bg-gray-300 text-white rounded-full shadow-lg hover:shadow-gray-700 hover:text-gray-700 py-3 px-10 text-center duration-200 hover:border-gray-400 border-transparent border-2  hover:border-2"
          >
            Signin to Continue
          </Link>
        </div>
      )}

      {currentUser && (
        <div className="mt-[100px] mx-auto flex flex-col sm:flex-row w-fit gap-4 justify-center ">
          <Link to="/search"

            className="bg-slate-700 hover:bg-gray-300 text-white rounded-full shadow-lg hover:shadow-gray-700 hover:text-gray-800 py-3 px-10 text-center duration-200 hover:border-gray-400 border-transparent border-2 font-semibold  hover:border-2"
          >
            Search Listing
          </Link>

          <Link to="/create-listing"

            className="bg-slate-700 hover:bg-gray-300 text-white rounded-full shadow-lg hover:shadow-gray-700 hover:text-gray-800 py-3 px-10 text-center duration-200 hover:border-gray-400 border-transparent border-2 font-semibold hover:border-2"
          >
            Create Listing
          </Link>
        </div>
      )}





      <footer className="h-[300px] p-14 bg-gradient-to-b from-gray-300 mt-[150px] to-gray-300">

        <div className=" flex flex-col sm:flex-row max-w-7xl mx-auto justify-between ">

          <div className=" flex flex-col mb-6">
            <h2 className="text-2xl font-bold text-gray-700">Grand <span className="text-gray-600">Estate</span></h2>
            <p className="text-sm text-gray-600">Find your dream home with ease</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-6 text-gray-700 font-semibold">
              <a href="/about" className="hover:text-gray-900">About</a>
              <a href="/search" className="hover:text-gray-900">Services</a>
              <a href="/profile" className="hover:text-gray-900">Profile</a>
            </div>

            <div className="flex gap-8 mt-4">
              <a href="#" className="text-gray-700 hover:text-blue-700 text-3xl"><FaSquareFacebook /></a>
              <a href="#" className="text-gray-700 hover:text-blue-500 text-3xl scale-110"><AiFillTwitterCircle /></a>
              <a href="#" className="text-gray-700 scale-110 hover:text-pink-700 text-3xl"><RiInstagramFill /></a>

            </div>
          </div>



        </div>


        <div className=" flex sm:flex-row-reverse  max-w-7xl mx-auto justify-between">
          {/* <div></div> */}
          <p className="text-xs flex gap-1 flex-wrap sm:whitespace-nowrap sm:text-sm text-gray-900 mt-6">
            <span className="font-semibold">© 2025 GrandEstate.</span> All rights reserved. Developed by <p className="font-bold">Passion</p>
          </p>
        </div>






      </footer>


    </div>
  );
}

