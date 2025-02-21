import { Button, Form, Input, InputOtp } from "@heroui/react";
import { useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function VerifyResetCode() {

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();


  const initialValues = {
    resetCode: '',
  }
  function onSubmit(values){
    setErrMsg('');
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
    .then(({data}) => {
      if(data.status == 'Success'){
        navigate('/resetPassword');
      }
    }).catch((err) => {
      setErrMsg(err.response.data.message)
    }).finally(() => {
      setIsLoading(false)
    }); 
  }

  const validationSchema = Yup.object({
    resetCode: Yup.string().required('Code is required').matches(/^[0-9]{6}$/,"Enter Code of 6 Numbers"),
    })

  const {values, handleChange, handleSubmit, errors, touched, handleBlur} = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    <div className="sm:w-2/3 mx-auto text-center mt-8 ">
      <h1 className="text-2xl font-semibold mb-3">Verify your code</h1>
      <p className="text-sm text-gray-500 mb-5">We have sent a code to your email</p>
      <Form onSubmit={handleSubmit} className="grid gap-5">
        <div className="flex flex-col items-center gap-2">
          <InputOtp length={6} color="primary" size="lg" isInvalid={touched.resetCode && errors.resetCode} errorMessage={errors.resetCode} name="resetCode" value={values.resetCode} onChange={handleChange} onBlur={handleBlur} className="caret-primary-500" label="Reset Code" type="text" variant={"bordered"} />
        </div>
          <Button type="submit" isLoading={isLoading} color="primary" className="max-w-xs items-center mx-auto w-80">
            Verify
          </Button>
        { errMsg && <p className="text-danger-500 py-0 text-sm">{errMsg}</p> }
        <p className="text-sm">Haven't received code? <Link className="text-primary-500 underline" to={'/forgetPassword'}>Resend Code</Link></p>
        </Form>
        </div>
      )
    }


    // <Input isInvalid={touched.resetCode && errors.resetCode} errorMessage={errors.resetCode} name="resetCode" value={values.resetCode} onChange={handleChange} onBlur={handleBlur} className="caret-primary-500" label="Reset Code" type="text" variant={"bordered"}/>  
