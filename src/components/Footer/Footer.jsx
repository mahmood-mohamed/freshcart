import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";

export default function Footer() {
  const { isLoggedIn } = useContext(authContext);

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-10 pb-2">
      <div className="container overflow-hidden">
        <div className="flex flex-wrap justify-between mx-auto gap-8 pb-10 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl shrink-0">
              <i className="fas fa-truck-fast"></i>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-gray-800 text-sm">Free Shipping</h4>
              <p className="text-gray-400 text-xs">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl shrink-0">
              <i className="fas fa-shield-halved"></i>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-gray-800 text-sm">Secure Payment</h4>
              <p className="text-gray-400 text-xs">100% safe checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl shrink-0">
              <i className="fas fa-rotate-left"></i>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-gray-800 text-sm">Easy Returns</h4>
              <p className="text-gray-400 text-xs">30-day return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl shrink-0">
              <i className="fas fa-headset"></i>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-gray-800 text-sm">Online Support</h4>
              <p className="text-gray-400 text-xs">Professional 24/7 help</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between mx-auto gap-8 pb-10 border-b border-gray-100 mb-5">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Your one-stop destination for fresh groceries and daily essentials. Quality and trust, delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          {isLoggedIn && (<div>
            <h3 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-widest">Shop & Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-500 hover:text-green-600 text-sm transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-500 hover:text-green-600 text-sm transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="text-gray-500 hover:text-green-600 text-sm transition-colors">My Cart</Link></li>
              <li><Link to="/wishlist" className="text-gray-500 hover:text-green-600 text-sm transition-colors">Wishlist</Link></li>
            </ul>
          </div>)}

          {/* Support */}
          <div>
            <h3 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-widest">Help Center</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-500 hover:text-green-600 text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-green-600 text-sm transition-colors">About FreshCart</Link></li>
              <li><Link to="/faqs" className="text-gray-500 hover:text-green-600 text-sm transition-colors">FAQs</Link></li>
              <li><Link to="/allorders" className="text-gray-500 hover:text-green-600 text-sm transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Social & Payments */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-widest">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="https://wa.me/+201210428009" target="_blank" className="w-10 h-10 border border-gray-100 bg-green-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://github.com/mahmood-mohamed" target="_blank" className="w-10 h-10 border border-gray-100 bg-green-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/mahmoud-mo/" target="_blank" className="w-10 h-10 border border-gray-100 bg-green-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Secure Checkout</p>
              <div className="flex gap-4 text-3xl text-gray-300">
                <i className="fab fa-cc-visa hover:text-blue-600 transition-colors"></i>
                <i className="fab fa-cc-mastercard hover:text-red-500 transition-colors"></i>
                <i className="fab fa-cc-paypal hover:text-blue-800 transition-colors"></i>
                <i className="fab fa-cc-apple-pay hover:text-black transition-colors"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-5 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} FreshCart Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <i className="fas fa-heart text-red-400"></i> by 
              <span className="text-gray-700 font-bold ml-1">Mahmoud Mansi</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
