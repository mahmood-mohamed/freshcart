import React from 'react'
import { useLocation } from 'react-router-dom';
import OrderDetailsComponent from '../../components/OderDetails/OrderDetailsComponent';

export default function OrderDetails() {

    const location = useLocation();
    const order = location.state?.order;  // استلام بيانات الطلب الممررة

    if (!order) return <p className='text-center py-4 text-red-500'>No order data available.</p>;

    return (
        <OrderDetailsComponent order={order} />
    )
}
