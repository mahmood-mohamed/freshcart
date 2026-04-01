import React from 'react'
import Slider from "react-slick";
import useFetch from "../../hooks/useFetch";

import { Skeleton } from "@heroui/react";

export default function BrandSlider() {
  const { data: brands, error, isLoading } = useFetch("brands");

  var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-white overflow-hidden">
        <div className="flex gap-4 mx-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1/6 px-4 hidden md:block">
              <Skeleton className="h-24 w-full rounded-xl">
                <div className="w-full h-full bg-default-300"></div>
              </Skeleton>
            </div>
          ))}
          {[...Array(2)].map((_, i) => (
            <div key={i + 6} className="w-1/2 px-4 md:hidden">
              <Skeleton className="h-24 w-full rounded-xl">
                <div className="w-full h-full bg-default-300"></div>
              </Skeleton>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (error) return null;

  return (
    <section className="py-12 bg-white overflow-hidden">
      <Slider {...settings} className="brand-slider">
        {brands?.map((brand) => (
          <div key={brand._id} className="px-4 outline-none">
            <div className="flex items-center justify-center p-4 h-24 bg-gray-50 rounded-xl hover:shadow-md transition-shadow grayscale hover:grayscale-0 transition-all duration-500">
              <img 
                src={brand.image} 
                alt={brand.name} 
                className="max-h-full max-w-full object-contain" 
                title={brand.name}
              />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
