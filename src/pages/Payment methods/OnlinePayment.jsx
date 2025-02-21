import { useContext } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function OnlinePayment() {
  const {cartId} = useParams();
  
    async function checkOut() {
      try {
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
          shippingAddress: values
          } ,
          {
            headers:{
              token: localStorage.getItem("token")
            },
            params: {
              url : "https://github.com/mahmood-mohamed/freshcart"
            }
          }
        );
        console.log(data);
        location.href = data.session.url ;
      } catch (error) {
        console.error("Error checking out:", error);
        setError("😣 Failed to check out. Please try again.");
      }
    }


    const initialValues = {
        details: '',
        city: '',
        phone: ''
    }

  const validationSchema = Yup.object({
    details: Yup.string().required('Details is required'),
    city: Yup.string().required('City is required'),
    phone: Yup.string().required('Phone number is required').matches( /^01[0-2|5]{1}[0-9]{8}$/, 'Phone number must be a valid Egyptian phone number (e.g., 01012345678)')
  }) 

  const {values, handleChange, handleSubmit, errors, touched, handleBlur} = useFormik({
    initialValues,
    onSubmit: checkOut,
    validationSchema
  });


  return (

    <div className="sm:w-2/3 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter Your Address</h1>
      <Form onSubmit={handleSubmit} className="grid gap-4 py-6">

        <Input
          isInvalid={touched.details && errors.details}
          errorMessage={errors.details}
          name="details"
          value={values.details}
          onChange={handleChange}
          onBlur={handleBlur}
          className="md:col-span-2 caret-primary-500 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:shadow-md transition-all"
          label="Details:"
          type="text"
          variant="bordered"
        />  

        {/* المدينة */}
        <Input
          isInvalid={touched.city && errors.city}
          errorMessage={errors.city}
          name="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          className="md:col-span-2 caret-primary-500 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:shadow-md transition-all"
          label="City:"
          type="text"
          variant="bordered"
        />  

        {/* الهاتف */}
        <Input
          isInvalid={touched.phone && errors.phone}
          errorMessage={errors.phone}
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className="md:col-span-2 caret-primary-500 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:shadow-md transition-all"
          label="Phone"
          type="tel"
          variant="bordered"
        />  

        {/* زر الدفع أونلاين */}
        <Button
          type="submit"
          className="md:col-span-2 flex items-center justify-center gap-3 p-3 mt-6 text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 rounded-lg"
          color="secondary"
        >
          <i className="fa-brands fa-stripe text-2xl text-yellow-300"></i>
          Pay Online
        </Button>
      </Form>
    </div>

  
  );
}
