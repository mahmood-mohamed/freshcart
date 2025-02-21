import { Button, Form, Input } from "@heroui/react";
import { useContext, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";

export default function ResetPassword() {

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(authContext);

  const initialValues = {
    email: '',
    newPassword: '',
  }
  function onSubmit(values){
    setErrMsg('');
    setIsLoading(true);
    axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
    .then(({data}) => {
        console.log(data);
        
        setIsLoggedIn(true);
        localStorage.setItem('token',data.token); // Save Token
        navigate('/');
    }).finally(() => {
      setIsLoading(false)
    }); 
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    newPassword: Yup.string().required('New password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character as:(@, #, $, %، ...).')
  })

  const {values, handleChange, handleSubmit, errors, touched, handleBlur} = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    <div className="sm:w-2/3 mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Reset Password</h1>
      <Form onSubmit={handleSubmit} className="grid gap-4 py-6">
        <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className="caret-primary-500" label="Email" type="email" variant={"bordered"}/>  
        <Input isInvalid={touched.newPassword && errors.newPassword} errorMessage={errors.newPassword} name="newPassword" value={values.newPassword} onChange={handleChange} onBlur={handleBlur} className="caret-primary-500" label="New Password" type="password" variant={"bordered"}/>  
        <Button type="submit" isLoading={isLoading} color="primary">
          Reset Password
        </Button>
        { errMsg && <p className="text-danger-500 text-sm">{errMsg}</p> }
        <p className="text-sm">Don’t have an account? <Link className="text-primary-500 hover:underline" to={'/register'}>Create account</Link></p>
      </Form>
    </div>
  )
}

