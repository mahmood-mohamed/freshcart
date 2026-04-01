import React from 'react'
import Slider from "react-slick";
import { Skeleton } from "@heroui/react";

export default function MainSlider({ data , style}) {

  var settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings:{
          slidesToShow: 5,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]

  }

  if (!data || data.length === 0) {
    return (
      <div className="flex gap-4 overflow-hidden py-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-1/8 min-w-[120px] px-2 flex-shrink-0 hidden lg:block">
            <Skeleton className="h-32 w-full rounded-lg">
              <div className="w-full h-full bg-default-300"></div>
            </Skeleton>
          </div>
        ))}
        {[...Array(5)].map((_, i) => (
          <div key={i + 8} className="w-1/5 min-w-[100px] px-2 flex-shrink-0 hidden md:block lg:hidden">
            <Skeleton className="h-32 w-full rounded-lg">
              <div className="w-full h-full bg-default-300"></div>
            </Skeleton>
          </div>
        ))}
        {[...Array(3)].map((_, i) => (
          <div key={i + 13} className="w-1/3 min-w-[80px] px-2 flex-shrink-0 md:hidden">
            <Skeleton className="h-32 w-full rounded-lg">
              <div className="w-full h-full bg-default-300"></div>
            </Skeleton>
          </div>
        ))}
      </div>
    );
  }
  return (
    <Slider {...settings}>
      {
        data?.map((item) => (
          <div key={item._id} className={`flex flex-col items-center justify-center bg-gray-50 shadow-lg h-32 overflow-hidden`}>
            <img src={item.image} alt={item.name} className='w-full h-24' />
            <h2 className='text-sm text-center py-2 font-bold'>{item.name}</h2>
          </div>
        ))
      }
    </Slider>
  )
}
