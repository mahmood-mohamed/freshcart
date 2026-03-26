import { Button } from "@heroui/react";
import heroBg from '../../assets/images/hero_bg.png';
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[650px] flex items-center overflow-hidden mx-4 md:mx-0 shadow-2xl">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Layered Advanced Gradient for Premium Look */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-green-900/10 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative mx-auto px-4 md:px-16 z-10 text-white max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight line-height-20 letter-spacing-10 mb-6 animate-fade-in-down tracking-tight">
          Everything You Need, <br />
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            All in One Place.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 animate-fade-in-up delay-200 font-medium leading-relaxed">
          From fresh organic harvest to the latest electronics and premium fashion. 
          Experience a curated world of quality delivered to your doorstep.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 animate-fade-in delay-500">
          <Button 
            as={Link}
            to="/products"
            size="lg" 
            color="success" 
            className="font-semibold px-8 py-6 text-lg shadow-lg transition-all hover:scale-105 bg-gradient-to-r from-green-600 to-emerald-600 border-none"
          >
            Shop Now
          </Button>
          <Button 
            as={Link}
            to="/categories"
            size="lg" 
            variant="bordered" 
            className="font-semibold px-8 py-6 text-lg border-2 border-white text-white hover:bg-green-600 hover:border-green-600 transition-all backdrop-blur-sm"
          >
            Explore Categories
          </Button>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </section>
  );
}
