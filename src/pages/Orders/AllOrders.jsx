import React, { useContext, useState } from 'react';
import axios from 'axios';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import { authContext } from '../../contexts/authContext';
import LoadingScreen from './../../components/LoadingScreens/LoadingScreen';
import { Button } from '@heroui/react';
import { formatCurrency } from '../../helpers/formatCurrencyHelper';


export default function AllOrders ()  {
  const {userId} = useContext(authContext);

  function getAllOrders(userId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  }
  const { data: orders = [], error, isLoading } = useQuery({
    queryKey: ['allOrders', userId],
    queryFn: () => getAllOrders(userId),
    select: (res) => res.data
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const toggleOrderDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  if (isLoading) return <div> <p className="text-center pt-4">Loading orders...</p> <LoadingScreen/></div>
  if (error) return <p className='text-center text-danger-500 py-4'>Error fetching orders: {error.message}</p>;

  const filteredOrders = orders.filter(order =>
    order.cartItems.some(item =>
      item.product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedOrders = [...filteredOrders].sort((a, b) =>
    sortOrder === 'desc' ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="px-2 sm:px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Order History</h1>

      <div className="mb-6 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 pl-10 pr-4 rounded-lg shadow-sm caret-blue-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search orders"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Button
          color="primary"
          onPress={handleSort}
          className='ms-4'
        >
          Sort by Date {sortOrder === 'desc' ? '↑' : '↓'}
        </Button>
      </div>

      <div className="space-y-6">
        {sortedOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 cursor-pointer flex flex-col sm:flex-row items-center justify-between" onClick={() => toggleOrderDetails(order._id)}>
              <div className="flex-grow">
                <h2 className="sm:text-xl font-semibold text-gray-800 mb-2">Order ID: {order._id}</h2>
                <p className="text-gray-600 mb-2">Total Price: {formatCurrency(order.totalOrderPrice)}</p>
                <p className="text-gray-500">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right flex items-center flex-col sm:block">
                <p className={`text-xl flex gap-1 items-center font-bold ${order.paymentMethodType === 'card' ? 'text-blue-600' : 'text-green-600'}`}>
                  {order.paymentMethodType === 'card' ? <FaCreditCard className="text-blue-500" /> : <FaMoneyBillWave className="text-green-500" />} {order.paymentMethodType}
                </p>
                {expandedOrder === order._id ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </div>
            {expandedOrder === order._id && (
              <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                {order.cartItems.map((item) => (
                  <div key={item._id} className="mb-4 flex items-center">
                    <img src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 object-cover rounded-md me-7" />
                    <div>
                      <p><strong>{item.product.title}</strong></p>
                      <p>Quantity: {item.count}</p>
                      <p>Price: {formatCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                <p><strong>Shipping Address: </strong> {order.shippingAddress.details}, {order.shippingAddress.city}</p>
                <p><strong>Phone: </strong> {order.shippingAddress.phone}</p>
                <p className=''><strong>Paid: </strong> {order.isPaid ? <span>Yes <i className="fa-regular fa-circle-check text-green-400"></i></span>  : <span>No <i className="fa-regular fa-circle-xmark text-red-600"></i></span>}</p>
                <p><strong>Delivered: </strong> {order.isDelivered ? <span>Yes <i className="fa-regular fa-circle-check text-green-400"></i></span>  : <span>No <i className="fa-regular fa-circle-xmark text-red-600"></i></span>}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

