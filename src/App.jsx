import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import Categories from './pages/Categories/Categories';
import Cart from './pages/Cart/Cart';
import Brands from './pages/Brands/Brands';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import AuthProtectedRoute from './protectedRoutes/AuthProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './contexts/authContext';
import CartItemsContext from './contexts/cartContext';
import Wishlist from './pages/Wishlist/Wishlist';
import WishlistProvider from './contexts/wishlistItemsContext';
import OnlinePayment from './pages/Payment methods/OnlinePayment';
import CashOnPayment from './pages/Payment methods/CashOnPayment';
import AllOrders from './pages/Orders/AllOrders';
import OrderDetails from './pages/Orders/OrderDetails';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import VerifyResetCode from './pages/VerifyResetCode/VerifyResetCode';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContactUs from './pages/ContactUs/ContactUs';
import About from './pages/About/About';
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';
import FAQs from './pages/FAQs/FAQs';


function App() {

  
  // Create a client Instance
  const queryClient = new QueryClient;


  const router = createHashRouter([
    {path: '', element: <MainLayout/>, children:[
      {index: true, element: <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path: '/login', element: <AuthProtectedRoute> <Login/> </AuthProtectedRoute>},
      {path: '/register', element: <AuthProtectedRoute> <Register/> </AuthProtectedRoute>},
      {path: '/forgetPassword', element: <AuthProtectedRoute> <ForgetPassword/> </AuthProtectedRoute>},
      {path: '/verifyResetCode', element: <AuthProtectedRoute> <VerifyResetCode/> </AuthProtectedRoute>},
      {path: '/resetPassword', element: <AuthProtectedRoute> <ResetPassword/> </AuthProtectedRoute>},
      {path: '/productDetails/:productId', element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
      {path: '/categories', element: <ProtectedRoute> <Categories/> </ProtectedRoute>},
      {path: '/brands', element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
      {path: '/contact', element: <ProtectedRoute> <ContactUs/> </ProtectedRoute>},
      {path: '/about', element: <ProtectedRoute> <About/> </ProtectedRoute>},
      {path: '/faqs', element: <ProtectedRoute> <FAQs/> </ProtectedRoute>},
      {path: '/wishlist', element: <ProtectedRoute> <Wishlist/> </ProtectedRoute>},
      {path: '/cart', element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
      {path: '/onlinePayment/:cartId', element: <ProtectedRoute> <OnlinePayment/> </ProtectedRoute>},
      {path: '/cashOnPayment/:cartId', element: <ProtectedRoute> <CashOnPayment/> </ProtectedRoute>},
      {path: '/allorders', element: <ProtectedRoute> <AllOrders/> </ProtectedRoute>},
      {path: '/order-details/:orderId', element: <ProtectedRoute> <OrderDetails/> </ProtectedRoute>},
      {path: '*', element: <NotFound/>},
    ]}
  ]);


  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartItemsContext>
          <WishlistProvider>
            <RouterProvider router={router}/>
            <ToastContainer />
            <ReactQueryDevtools/>
          </WishlistProvider>
        </CartItemsContext>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
