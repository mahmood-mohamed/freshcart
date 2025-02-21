import React from 'react'
import Slider from "react-slick";

export default function MainSlider({ data , style}) {

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 9,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
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
  return (
    <Slider {...settings}>
      {
        data?.map((item) => (
          <div key={item._id} className={`flex flex-col items-center justify-center bg-gray-50 shadow-md h-32 overflow-hidden`}>
            <img src={item.image} alt={item.name} className='w-full h-24' />
            <h2 className='text-sm text-center py-2'>{item.name}</h2>
          </div>
        ))
      }
    </Slider>
  )
}
