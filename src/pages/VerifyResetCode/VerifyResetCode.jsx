import { Button, Form, Input, InputOtp } from "@heroui/react";
import { useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api/axiosInstance";


export default function VerifyResetCode() {

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const email = localStorage.getItem('email');
  // show only first 3 letters and last 3 letters of email and replace the middle with ***
  const emailSuffix = email.split('@')[1];
  const emailPrefix = email.split('@')[0];
  const maskedEmail = `${emailPrefix.slice(0, 3)} ${'*'.repeat(emailPrefix.length - 3)} @${emailSuffix}`;

  const initialValues = {
    resetCode: '',
  }
  function onSubmit(values){
    setErrMsg('');
    setIsLoading(true);
    api.post('auth/verifyResetCode', values)
    .then(({data}) => {
      if(data.status == 'Success'){
        navigate('/resetPassword');
        localStorage.removeItem('email');
      }
    }).catch((err) => {
      setErrMsg(err.response.data.message);
      values.resetCode = '';
    }).finally(() => {
      setIsLoading(false);
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
    <div className="sm:w-1/2 max-w-sm w-full mx-auto px-4 text-center my-10 ">
      <h1 className="text-2xl font-semibold mb-3">Verify Your Code</h1>
      <p className="text-sm text-gray-500 mb-5">
        We have sent a code to your email address <br /> <span className="text-gray-600">{maskedEmail}</span>
      </p>
      <Form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
        <div className="flex flex-col w-full items-center gap-3 mt-3">
          <InputOtp length={6} color="primary" size="md" isInvalid={touched.resetCode && errors.resetCode} errorMessage={errors.resetCode} name="resetCode" value={values.resetCode} onChange={handleChange} onBlur={handleBlur} className="caret-primary-500" label="Reset Code" type="text" variant={"bordered"} />
          <Button type="submit" isLoading={isLoading} color="primary" className="max-w-xs items-center mx-auto w-64">
            Verify
          </Button>
        </div>
        { errMsg && <p className="text-danger-500 py-0 text-sm">{errMsg}</p> }
        <p className="text-sm">Haven't received code? <Link className="text-primary-500 underline" to={'/forgetPassword'}>Resend Code</Link></p>
      </Form>
    </div>
  );
}
