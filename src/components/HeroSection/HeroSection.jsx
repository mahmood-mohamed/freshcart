import { Button } from "@heroui/react";
import heroBg from '../../assets/images/hero_bg.png';
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden bg-gray-900">
      {/* Background Image with Slow Zoom Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out hover:scale-110"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
      </div>

      {/* Modern Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent md:w-3/4 lg:w-2/3 xl:w-1/2"></div>
      {/* Extra bottom gradient for mobile readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent md:hidden"></div>

      {/* Decorative Aurora Glow Effects */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Content Container */}
      <div className="relative z-10 container px-4 sm:px-6 lg:px-8 mx-auto flex items-center">
        <div className="max-w-2xl text-left">
          
          {/* Glassmorphism Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 animate-fade-in-down shadow-lg">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="tracking-wide">100% Fresh & Organic</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up">
            Fresh Groceries, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Delivered Fast.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 font-medium leading-relaxed animate-fade-in-up delay-100 max-w-xl">
            Skip the lines and get premium quality fresh produce, meats, and daily essentials delivered directly to your door in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
            <Button 
              as={Link}
              to="/products"
              size="lg" 
              className="bg-green-600 hover:bg-green-500 text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all hover:scale-105 border-none w-full sm:w-auto"
            >
              Shop Now <i className="fas fa-arrow-right ml-2 text-sm"></i>
            </Button>
            <Button 
              as={Link}
              to="/categories"
              size="lg" 
              variant="bordered" 
              className="border-white/30 text-white hover:bg-white hover:text-gray-900 font-semibold text-lg px-8 py-6 rounded-xl transition-all backdrop-blur-sm w-full sm:w-auto"
            >
              Explore Categories
            </Button>
          </div>

          {/* Quick Stats - Adds Trust and Premium Feel */}
          <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/10 animate-fade-in-up delay-300">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white mb-1">15k+</p>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold">Products</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white mb-1">24/7</p>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold">Support</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white mb-1">99%</p>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold">Satisfied</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
