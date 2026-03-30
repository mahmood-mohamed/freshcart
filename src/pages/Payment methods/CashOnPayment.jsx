import React, { useState } from "react";
import { Form, Input, Button, BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import OrderDetails from "../../components/OderDetails/OrderDetailsComponent";

export default function CashOnPayment() {
  const navigate = useNavigate();
  const { cartId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function checkOut() {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.status === "success") {
        console.log("Order Data:", data.data);

        navigate(`/order-details/${data.data._id}`, { state: { order: data.data } }); // ✅ تمرير البيانات مباشرةً
      }
    } catch (error) {
      console.error("Error checking out:", error);
      setError("😣 Failed to check out. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  const initialValues = {
    details: "",
    city: "",
    phone: "",
  };


  const validationSchema = Yup.object({
    details: Yup.string().required("Details is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0-2|5]{1}[0-9]{8}$/, "Invalid phone number!..(e.g., 01012345678)"),
  });

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues,
    onSubmit: checkOut,
    validationSchema,
  });

  return (
    <div className="sm:w-2/3 mx-auto container mx-auto px-4 py-12">
      {/* breadcrumb */}
      <Breadcrumbs
        separator="/"
        className="mb-6"
      >
        <BreadcrumbItem>
          <Link to="/" className="inline-block hover:opacity-80">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/cart" className="inline-block hover:opacity-80">Cart</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/checkout" className="inline-block hover:opacity-80">Checkout</Link>
        </BreadcrumbItem>
      </Breadcrumbs>



      <div className="flex items-center justify-center gap-2 mb-6">
        <i className="fa-solid fa-truck text-2xl text-green-600"></i>
        <h1 className="text-2xl font-bold text-center">Enter Your Address</h1>
      </div>

      <Form onSubmit={handleSubmit} className="grid gap-4 py-6">
        <Input
          isInvalid={touched.details && errors.details}
          errorMessage={errors.details}
          name="details"
          value={values.details}
          onChange={handleChange}
          onBlur={handleBlur}
          className="md:col-span-2 caret-primary-500"
          label="Details:"
          type="text"
          variant="bordered"
        />

        <Input
          isInvalid={touched.city && errors.city}
          errorMessage={errors.city}
          name="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          className="md:col-span-2 caret-primary-500"
          label="City:"
          type="text"
          variant="bordered"
        />

        <Input
          isInvalid={touched.phone && errors.phone}
          errorMessage={errors.phone}
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className="md:col-span-2 caret-primary-500"
          label="Phone"
          type="tel"
          variant="bordered"
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="md:col-span-2 flex items-center justify-center gap-3 p-3 mt-6 text-white bg-green-600 hover:bg-green-700 rounded-lg"
          color="secondary"
        >
          {loading ? "Processing..." : <span><i className="fa-solid fa-truck text-xl"></i> Pay on Delivery</span>}
        </Button>
      </Form>
    </div>
  );
}
