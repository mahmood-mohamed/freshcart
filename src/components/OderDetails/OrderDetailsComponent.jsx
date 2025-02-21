import { Link } from "react-router-dom";
import { formatCurrency } from "../../helpers/formatCurrencyHelper";

export default function OrderDetails({ order }) {
    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            {/* 🧾 عنوان الفاتورة */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                🧾 Order Invoice
            </h2>

            {/* 📌 معلومات الطلب */}
            <div className="border-b pb-3 mb-4">
                <p className="text-sm text-gray-500">
                    <strong>Order ID:</strong> {order._id}
                </p>
                <p className="text-sm text-gray-500">
                    <strong>Status:</strong>{" "}
                    <span
                        className={`font-semibold ${order.isDelivered ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {order.isDelivered ? "Delivered" : "Not Delivered"}
                    </span>
                </p>
            </div>

            {/* 💰 تفاصيل الدفع */}
            <div className="border-b pb-3 mb-4">
                <p className="text-lg font-semibold">
                    <strong>Total Price:</strong> {formatCurrency(order.totalOrderPrice)}
                </p>
                <p className="text-sm text-gray-500">
                    <strong>Payment Method: </strong> {order.paymentMethodType.toUpperCase()}
                </p>
            </div>

            {/* 🚚 عنوان الشحن */}
            <div className="border-b pb-3 mb-4">
                <p className="text-md font-medium">📍 Shipping Address</p>
                <p className="text-sm text-gray-500">
                    {order.shippingAddress.details}, {order.shippingAddress.city}
                </p>
                <p className="text-sm text-gray-500">
                    <strong>Phone: </strong> {order.shippingAddress.phone}
                </p>
            </div>

            {/* 🛒 قائمة المنتجات */}
            <div>
                <h4 className="text-md font-semibold border-b pb-2 mb-3">🛍️ Cart Items</h4>
                <ul className="divide-y divide-gray-300">
                    {order.cartItems.map((item, index) => (
                        <li key={index} className="py-2">
                            <p className="text-sm">
                                <strong>Product ID: </strong> {item.product}
                            </p>
                            <p className="text-sm">
                                <strong>Price: </strong> {formatCurrency(item.price)}
                            </p>
                            <p className="text-sm">
                                <strong>Quantity: </strong> {item.count}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 📦 قائمة الطلبات */}
            <div className="mt-6 text-center">
                <Link
                    to="/allorders"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    📦 View All Orders
                </Link>
            </div>
        </div>
    );
}
