/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react'
import { Logo } from '../../components/Logo'
import { LogoDesign } from '../../components/LogoDesign'
import { PoweredByComponent } from '../../components/PoweredBy'
import { CONSTANTS } from '../../includes/constant'
import { BaseButton, LightYellowButton } from '../../components/buttons'
import { Formik } from 'formik';
import * as y from 'yup';
import { GoBackIcon } from '../../assets/icons/BackIcon'

import OTPInput from 'react18-input-otp';
import { PostRequest } from '../../includes/functions'
const schema = y.object({
otp:y.string().required().max(4,"OTP must be 4 characters.").min(4,"OTP must be 4 characters."),
})
export default function OTPScreen() {
 const [loading,setLoading] = useState(false);
 const [resetloading,setResetLoading] = useState(false);
 const [timer, setTime] = useState<number>(0);
 const max:number = 30;
 const TimeCounter = useRef(null) as any;
 const CountDown = ()=>{
  if(timer !== 0)
  {
    return ;
  }
  TimeCounter.current = setInterval(()=>{
    if(timer === max)
    {
    setTime((timer)=>0);
    clearInterval(TimeCounter.current);
    return ;
    }
    setTime((timer)=>timer+1);
  },1000)
 }

 const ResendOTP = ()=>{
  setResetLoading(true);
  CountDown();
  PostRequest("admin/forgot-password",{
    email:localStorage.getItem(CONSTANTS.Routes.ForgotPassword)
  },true).then((res)=>{
    setResetLoading(false);
    if(res.success)
    {
      window.location.href = "/"+CONSTANTS.Routes.CreatePassword
    }
   })
 }

  return (<div className='row'>
     <div className='col-3 sidemenu position-relative' >
     <div className='p-5 ' >
        <Logo />
        <div className='sub'>
        Dare to move,<br/>keep the record
        </div>
        </div>
        <div className='logo-wrapper' >
        <LogoDesign />
        </div>
     </div>
<div className='col-9 p-5' >
<Formik
onSubmit={(values)=>{
 setLoading(true);
 CountDown();
 PostRequest("admin/verify-otp",values,true).then((res)=>{
  setLoading(false);
 })
}}
validationSchema={schema}
initialValues={{
  otp:"",
  email:localStorage.getItem(CONSTANTS.Routes.ForgotPassword)
}}
>
{({handleSubmit,handleChange,setFieldValue,values})=><div className='ps-5' >
       <div className='pb-5'>
        <LightYellowButton
        to={"../"+CONSTANTS.Routes.Login}
        >
      <GoBackIcon
      color="#F8B02B"
      size={15}
      />
       <span className='ps-2'>Go back</span>
        </LightYellowButton>
        </div> 
        <div className="text-start title-text">Verify email address</div>
        <div className="text-start">Please enter the OTP we sent to your email address to proceed</div>
        <div className='row p-5 ps-0' >
        <div className='col-8' >
        <div className='text-center d-flex justify-content-center align-items-center' >
        <OTPInput
        value={values.otp} 
        onChange={(enteredOtp:string) => {
         setFieldValue("otp",enteredOtp);
        }} 
        numInputs={4} 
        inputStyle={{
          display: "block",
          width: "100%",
          paddingVertical:15,
          paddingHorizontal: 0.75,
          fontSize: 16,
          fontWeight: "bold",
          height:40,
          color: "#212529",
          backgroundColor: "#fff",
          borderWidth: 1,
          borderStyle:"solid",
          borderColor:"#ced4da",
          borderRadius:8,
          transition: "border-color .15s ease-in-out",
          boxShadow:".15s ease-in-out"
        }}
        separator={<span style={{width:10}}></span>} 
        /> 
        </div>
        <div className='text-center mb-5 mt-5'>
        <span className='timer-text1 btn'>I have not received it  <span className='timer-text2' onClick={()=>{
          ResendOTP()
        }}>Resend OTP {timer}</span></span>
        </div>
        <BaseButton 
        onClick={handleSubmit}
        loading={loading}
        style={{marginTop:30}}
        >Verify</BaseButton>
        </div>
        <div className='col-2' ></div>
        </div>
        </div>}
     </Formik>
        <span className='poweredby'>
            <PoweredByComponent />
        </span>
     
     </div>
    </div>
  )
}
