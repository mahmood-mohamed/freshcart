import { useContext, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Badge } from "@heroui/react";
import { authContext } from "../../contexts/authContext";
import { CartItemsContext } from "../../contexts/cartContext";
import { wishlistContext } from "../../contexts/wishlistItemsContext";
import Logo from './../Logo/Logo';

export default function NavbarComponent() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, userName } = useContext(authContext);
  const { numOfCartItems } = useContext(CartItemsContext);
  const { numOfWishlistItems } = useContext(wishlistContext)
  const firstName = userName.split(" ")[0]; // Cut first name


  function logOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    // localStorage.removeItem('userName');
    // localStorage.removeItem('userEmail');
    navigate('/login');
  }

  // Function to extract initials from a name
  function getInitials(name) {
    if (!name) return "U"; // إذا لم يكن هناك اسم، عرض "U" كافتراضي

    const words = name.trim().split(" "); // تقسيم الاسم إلى كلمات
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase(); // إذا كان الاسم كلمة واحدة، عرض أول حرف فقط
    }

    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase(); // استخراج أول حرفين من الاسم الأول والثاني
  }


  const menuItems = [
    "Home",
    "Categories",
    "Brands",
    "Cart",
    "Wishlist",
  ];

  return (
    <Navbar shouldHideOnScroll isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo/>
        </NavbarBrand>
      </NavbarContent>

      {isLoggedIn && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <NavLink color="foreground" to={item === "Home" ? "/" : "/" + item.toLowerCase()} className="relative flex items-center">
                {item}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      <NavbarContent justify="end">

        {isLoggedIn && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {numOfCartItems > 0 && (
                <Link to="/cart" className="relative" title="Cart">
                  <Badge color="danger" content={numOfCartItems} shape="circle">
                    <i className="fas fa-shopping-cart text-2xl  text-gray-800"></i>
                  </Badge>
                </Link>
              )}

              {
                numOfWishlistItems > 0 && (
                  <Link to="/wishlist" className="relative" title="Wishlist">
                    <Badge color="danger" content={numOfWishlistItems} shape="circle">
                      <i className="fas fa-heart text-2xl text-red-600 mr-2"></i>
                    </Badge>
                  </Link>
                )
              }

            </div>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  showFallback
                  name={getInitials(userName)}
                  color="default"
                  className="text-primary-600 text-lg font-bold select-none cursor-pointer"
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="bg-gray-50 py-2 selected-none">
                  <p className="font-medium text-lg">
                   Welcome, {firstName} 👋
                  </p>
                </DropdownItem>

                <DropdownItem key="-my-orders"><Link to={`/allorders`} className="block">My Orders</Link></DropdownItem>
                <DropdownItem key="help_and_feedback"><Link to={`/contact`} className="block">Help & Feedback</Link></DropdownItem>
                <DropdownItem key="faqs"><Link to={`/faqs`} className="block">FAQs</Link></DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <button onClick={logOut} className='bg-transparent w-full' variant="ghost">
                    Logout
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}





        {!isLoggedIn && (
          <>
            <NavbarItem className="hidden sm:flex">
              <NavLink to={"/login"}>
                <Button color="primary" variant="solid">
                  Login
                </Button>
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink to={"/register"}>
                <Button color="primary" variant="bordered">
                  Sign Up
                </Button>
              </NavLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {isLoggedIn && (
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key={`${item}-${index}`}>
              <NavLink
                className="w-full relative flex items-center"
                to={item === "Home" ? "/" : "/" + item.toLowerCase()}
                size="lg"
              >
                {item}

              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
}
