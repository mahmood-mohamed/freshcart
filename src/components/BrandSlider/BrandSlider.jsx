import React from 'react'
import Slider from "react-slick";
import useFetch from "../../hooks/useFetch";
import LoadingScreen from "../LoadingScreens/LoadingScreen";

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

  if (isLoading) return <LoadingScreen />;
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
