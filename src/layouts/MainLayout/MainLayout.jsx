import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-lvh flex justify-between flex-col">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
