import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar/>
        <div className="container">
          <Outlet/>
        </div>
      <Footer/>
    </>
  )
}
