import { Button, Form, Input } from "@heroui/react";
import {  useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api/axiosInstance";

export default function ForgetPassword() {

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    email: '',
  }
  function onSubmit(values){
    setErrMsg('');
    setIsLoading(true);
    api.post('auth/forgotPasswords', values)
    .then(({data}) => {      
      if(data.statusMsg == 'success'){  
        navigate('/verifyResetCode');
        localStorage.setItem('email',values.email);
      }
    }).catch((err) => {
      setErrMsg(err.response.data.message)
    }).finally(() => {
      setIsLoading(false)
    }); 
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    })

  const {values, handleChange, handleSubmit, errors, touched, handleBlur} = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    <div className="sm:w-1/2 mx-auto w-full max-w-lg px-5 py-10 my-10 pb-10">
      <h1 className="text-2xl font-semibold mb-2 text-center">Forget Password</h1>
      <p className="text-sm mb-4 text-center">Enter your email address and we'll send you a code to reset your password.</p>
      <Form onSubmit={handleSubmit} className="grid gap-3 py-6">
        <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className="caret-primary-500 mb-3" label="Email" type="email" variant={"bordered"}/>  
        
        <Button type="submit" isLoading={isLoading} color="primary">
          Send
        </Button>
        { errMsg && <p className="text-danger-500 text-sm">{errMsg}</p> }
        <p className="text-sm">
          Don't have an account? 
          <Link className="text-primary-500 hover:underline" to={'/register'}> Register</Link>
        </p>
      </Form>
    </div>
  )
}

