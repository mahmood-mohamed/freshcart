import { Button, Form, Input } from "@heroui/react";
import { useContext, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    email: '00@gmail.com',
  }
  function onSubmit(values){
    setErrMsg('');
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
    .then(({data}) => {
      console.log(data);
      
      if(data.statusMsg == 'success'){  
        navigate('/verifyResetCode');
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
    <div className="sm:w-2/3 mx-auto mt-8 text-center">
      <h1 className="text-2xl font-semibold">Forget Password</h1>
      <Form onSubmit={handleSubmit} className="grid gap-2 py-6">
        <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className="caret-primary-500 mb-3" label="Email" type="email" variant={"bordered"}/>  
        
        <Button type="submit" isLoading={isLoading} color="primary">
          Send
        </Button>
        { errMsg && <p className="text-danger-500 text-sm">{errMsg}</p> }
        <p className="text-sm"> <Link className="text-primary-500 hover:underline" to={'/login'}>Back to Login</Link></p>
      </Form>
    </div>
  )
}

