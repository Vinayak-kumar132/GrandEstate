import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("api/listing/get?offer=true&limit=4");
        const data = await res.json();
        console.log("Offer Listings:", data); // Debugging API response
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
        console.log("Rent Listings:", data);
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
        console.log("Sale Listings:", data);
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

        <p className='text-sm text-gray-400'>
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
      <div className="max-w-6xl mx-auto p-4 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl text-slate-700 font-semibold">
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
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl text-slate-700 font-semibold">
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
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl text-slate-700 font-semibold">
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
      
    </div>
  );
}

