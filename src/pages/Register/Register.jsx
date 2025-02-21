import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Register() {
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }

  function onSubmit(values){
    setErrMsg('')
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .then(({data}) => {
      if(data.message == 'success'){
        navigate('/login', { replace: true }) // { replace: true } ==> for remove from history (not use 'back arrow')
      }
    }).catch((err) => {
      setErrMsg(err.response.data.message);
    }).finally(() => {
      setIsLoading(false)
    })
    console.log(values);
    
  }

  const validationSchema = Yup.object({
    // name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be at most 20 characters'),
    name: Yup.string().required('Name is required').matches(  /^[a-zA-Z\s]{3,20}$/,  'Name must only contain letters and spaces, and be between 3 and 20 characters long'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character as:(@, #, $, %، ...).'),
    rePassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], 'Password must match'),
    phone: Yup.string().required('Phone number is required').matches( /^01[0-2|5]{1}[0-9]{8}$/, 'Phone number must be a valid Egyptian number (e.g., 01012345678)')
  }) 

  const {values, handleChange, handleSubmit, errors, touched, handleBlur} = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });


  return (

    <div className="sm:w-2/3 mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Register Now</h1>
      <Form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 py-6">
        <Input isInvalid={touched.name && errors.name} errorMessage={errors.name} name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2 caret-primary-500" label="Name" type="text" variant={"bordered"}/>  
        <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2 caret-primary-500" label="Email" type="email" variant={"bordered"}/>  
        <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className="caret-primary-500" label="Password" type="password" variant={"bordered"}/>  
        <Input isInvalid={touched.rePassword && errors.rePassword} errorMessage={errors.rePassword} name="rePassword" value={values.rePassword} onChange={handleChange} onBlur={handleBlur} className="caret-primary-500" label="Re-password" type="password" variant={"bordered"}/>  
        <Input isInvalid={touched.phone && errors.phone} errorMessage={errors.phone} name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2 caret-primary-500" label="Phone" type="tel" variant={"bordered"}/>  
        <Button type="submit" isLoading={isLoading} className="md:col-span-2" color="primary">
          Register
        </Button>
        { errMsg && <p className="text-danger-500 text-sm">{errMsg}</p> }
        <p className="text-sm">Already have an account? <Link className="text-primary-500 hover:underline" to={'/login'}>Login</Link></p>
      </Form>
    </div>
  );
}
