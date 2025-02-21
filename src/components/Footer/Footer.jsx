import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";


export default function Footer() {

  const { isLoggedIn } = useContext(authContext);

  return (
    <footer className="bg-zinc-50 text-slate-900 py-2">
    <div className="container mx-auto px-6">
      {/* Benefits Section */}
      {isLoggedIn && 
        <div className="grid md:grid-cols-3 gap-8 text-center  border-b border-gray-700 pb-8">
          <div>
            <h3 className="text-lg mb-1 font-semibold"><i className="fa-solid fa-truck-fast  text-blue-500"></i> Free Delivery</h3>
            <p className="text-gray-400 text-sm">On all orders above 24.99 EGP</p>
          </div>
          <div>
            <h3 className="text-lg mb-1 font-semibold"><i className="fa-brands fa-cc-visa text-blue-500"></i> Secure Payment</h3>
            <p className="text-gray-400 text-sm">100% safe and reliable</p>
          </div>
          <div>
            <h3 className="text-lg mb-1 font-semibold"><i className="fa-solid fa-rotate-left text-blue-500"></i> Easy Returns</h3>
            <p className="text-gray-400 text-sm">Hassle-free 30-day returns</p>
          </div>
        </div>
      }

      {/* Footer Content */}
      <div className={` flex justify-between flex-wrap flex-row gap-8 mt-8`}>
        {/* Logo & Contact Info */}
        <div>
          <Logo/>
          <p className="text-gray-700 mt-2">Your go-to store for the best deals.</p>
          <p className="text-gray-700 text-sm mt-4"><i className="fa-solid fa-location-dot pe-1 fa-lg"></i> Manial Arous, Ashmoun, Menoufia, Egypt</p>
          <p className="text-gray-700 py-3 text-sm"><i className="fa-solid fa-phone pe-1  fa-lg"></i> 01210428009</p>
          <p className="text-gray-700 text-sm"><i className="fa-regular fa-envelope pe-1 fa-lg"></i> firstyear265@gmail.com</p>
        </div>

        {isLoggedIn && (
          <>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="text-gray-700 space-y-2">
              <li><Link to="/" className="hover:text-gray-900 hover:ps-1 transition-all">Home</Link></li>
              <li><Link to="/cart" className="hover:text-gray-900 hover:ps-1 transition-all">Cart</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900 hover:ps-1 transition-all">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-gray-900 hover:ps-1 transition-all">About</Link></li>
            </ul>
          </div>
  
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
            <ul className="text-gray-700 space-y-2">
              <li><Link to="/faqs" className="hover:text-gray-900 hover:ps-1 transition-all">FAQs</Link></li>
              <li><Link to="/allorders" className="hover:text-gray-900 hover:ps-1 transition-all">Shipping & Returns</Link></li>
              <li><a href="#" className="hover:text-gray-900 hover:ps-1 transition-all">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:ps-1 transition-all">Terms & Conditions</a></li>
            </ul>
          </div>
          </>
        )}

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <p className="text-gray-700 text-sm">Stay connected for the latest updates.</p>
          <div className="flex space-x-4 mt-4">
          <a
            href="mailto:firstyear265@gmail.com"
            title="Email Us"
            className="text-gray-600 hover:text-gray-950 text-2xl"
          >
            <i className="fa-brands fa-google"></i>
          </a>

            <a
              href="https://wa.me/01210428009"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="text-gray-600 hover:text-gray-950 text-2xl"
             >
              <i className="fa-brands fa-whatsapp"></i>
            </a>

            <a
              href="https://github.com/mahmood-mohamed"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="text-gray-600 hover:text-gray-950 text-2xl"
            >
              <i className="fa-brands fa-github"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/mahmoud-mohamed-b65b42265/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="text-gray-600 hover:text-gray-950 text-2xl"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-600 text-sm mt-8 space-y-2">
        <p>© 2025 FreshCart. All rights reserved.</p>
        <p className="text-gray-500 transition hover:underline hover:text-sky-700 font-medium flex items-center justify-center gap-1">
          Mahmoud Mohamed Mansy 🤞
          <i className="fa-solid fa-heart text-red-500"></i>
        </p>
      </div>

    </div>
  </footer>
);
}
