import ShowProducts from './../../components/ShowProducts/ShowProducts';
import HeroSection from '../../components/HeroSection/HeroSection';
import SubCategorySection from '../../components/SubCategorySection/SubCategorySection';
import BrandSlider from '../../components/BrandSlider/BrandSlider';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <div className="container mt-2">
        <div className="mt-5 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Our Trusted <span className="text-green-600">Brands</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mt-2 rounded-full"></div>
        </div>
        <BrandSlider />
      </div>
      <div className="py-10 mt-5 border-b border-gray-100 bg-gray-50">
        <div className="my-2 md:my-5 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Shop by <span className="text-green-600">Category</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mt-2 rounded-full"></div>
        </div>
        <SubCategorySection />
      </div>


      <section className="container py-20">
        <div className="my-5 md:my-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
              Featured <span className="text-green-600">Products</span>
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-500 max-w-lg mx-auto italic">
              "Handpicked selection of our top-rated and best-selling items, just for you."
            </p>
        </div>
        
        <ShowProducts hideFilters={true} limit={12} />
        
        <div className="mt-10 text-center">
          <Button 
            as={Link}
            to="/products"
            size="sm"
            color="success"
            variant="ghost"
            className="font-bold px-4 border-2 hover:bg-green-600 hover:text-white transition-all transform hover:scale-105"
            endContent={<i className="fas fa-chevron-right ms-1"></i>}
          >
            Explore All Products
          </Button>
        </div>
      </section>

      <section className="bg-green-50 py-10 md:py-15 mt-10 border-t border-green-100">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Why Shop With <span className="text-green-600">FreshCart?</span></h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-6 text-3xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Fast & Free Shipping</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Enjoy free home delivery for all orders over 300 EGP. Reliable and on-time.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-6 text-3xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">24/7 Support</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our professional support team is always ready to assist you anytime.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-6 text-3xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">100% Secure Payment</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We ensure your transactions are encrypted and fully protected.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-6 text-3xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Freshness Guarantee</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Only the best quality and freshest products are picked for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
