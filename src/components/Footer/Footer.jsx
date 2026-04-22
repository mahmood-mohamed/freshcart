import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";

export default function Footer() {
  const { isLoggedIn } = useContext(authContext);

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-gray-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <i className="fas fa-truck-fast"></i>
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-800 text-sm">Free Shipping</h4>
              <p className="text-gray-500 text-xs">On orders over 300 EGP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <i className="fas fa-shield-halved"></i>
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-800 text-sm">Secure Payment</h4>
              <p className="text-gray-500 text-xs">100% safe checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <i className="fas fa-rotate-left"></i>
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-800 text-sm">Easy Returns</h4>
              <p className="text-gray-500 text-xs">14-day return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <i className="fas fa-headset"></i>
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-800 text-sm">Online Support</h4>
              <p className="text-gray-500 text-xs">Professional 24/7 help</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-8 pb-4 border-b border-gray-200 mb-4">
          <div className="space-y-3 max-w-xs">
            <Logo />
            <p className="text-gray-500 text-xs leading-relaxed">
              Your one-stop destination for fresh groceries and daily essentials. Quality and trust, delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          {isLoggedIn && (<div>
            <h3 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">For Shoppers</h3>
            <ul className="space-y-1">
              <li><Link to="/" className="text-gray-500 hover:text-green-600 hover:translate-x-1 inline-block text-sm transition-all duration-300">Home</Link></li>
              <li><Link to="/cart" className="text-gray-500 hover:text-green-600 hover:translate-x-1 inline-block text-sm transition-all duration-300">My Cart</Link></li>
              <li><Link to="/wishlist" className="text-gray-500 hover:text-green-600 hover:translate-x-1 inline-block text-sm transition-all duration-300">Wishlist</Link></li>
              <li><Link to="/allorders" className="text-gray-500 hover:text-green-600 hover:translate-x-1 inline-block text-sm transition-all duration-300">Order Tracking</Link></li>
            </ul>
          </div>)}

          {/* Support */}
          <div>
            <h3 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">For Customers</h3>
            <ul className="space-y-1">
              <li><Link to="/contact" className="text-gray-500 hover:text-green-600 hover:translate-x-1 inline-block text-sm transition-all duration-300">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-green-600 hover:translate-x-1 inline-block text-sm transition-all duration-300">About FreshCart</Link></li>
              <li><Link to="/faqs" className="text-gray-500 hover:text-green-600 hover:translate-x-1 inline-block text-sm transition-all duration-300">FAQs</Link></li>
              <li><Link to="/products" className="text-gray-500 hover:text-green-600 hover:translate-x-1 inline-block text-sm transition-all duration-300">All Products</Link></li>
            </ul>
          </div>

          {/* Social & Payments */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wider">Connect With Us</h3>
              <div className="flex gap-3">
                <a href="https://wa.me/+201210428009" target="_blank" rel="noreferrer" className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://github.com/mahmood-mohamed" target="_blank" rel="noreferrer" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white transition-all duration-300">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/mahmoud-mo/" target="_blank" rel="noreferrer" className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-300">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">Secure Checkout</h3>
              <div className="flex gap-3 text-lg text-gray-400">
                <i className="fab fa-cc-stripe hover:text-indigo-500 transition-colors cursor-pointer"></i>
                <i className="fab fa-cc-visa hover:text-blue-700 transition-colors cursor-pointer"></i>
                <i className="fab fa-cc-paypal hover:text-blue-900 transition-colors cursor-pointer"></i>
                <i className="fab fa-cc-apple-pay hover:text-black transition-colors cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} FreshCart Store. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <i className="fas fa-heart text-red-500 animate-pulse"></i> by 
            <span className="text-gray-800 font-bold">Mahmoud Mansi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
