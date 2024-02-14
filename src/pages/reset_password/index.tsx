/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Logo } from '../../components/Logo'
import { LogoDesign } from '../../components/LogoDesign'
import { PoweredByComponent } from '../../components/PoweredBy'
import BaseInput from '../../components/baseInput'
import { NavLink, useNavigate} from 'react-router-dom'
import { CONSTANTS } from '../../includes/constant'
import { BaseButton, LightYellowButton } from '../../components/buttons'
import { Formik } from 'formik';
import * as y from 'yup';
import { GoBackIcon } from '../../assets/icons/BackIcon'
import { PostRequest } from '../../includes/functions'
import { BackBtn } from '../../components/BackBtn'
import OtpInput from 'react18-input-otp'
import CreatePasswordScreen from '../create_password'
const schema = y.object({
    email:y.string().required().email("A valid email is required.")
    })
const schemaOTP = y.object({
otp:y.string().required().max(4,"OTP must be 4 characters.").min(4,"OTP must be 4 characters."),
})
export default function ResetPasswordScreen() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [section,setSection] = useState<"token"|"forgot-password"|"new-password">("new-password");
  const [timer, setTime] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
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
  const [resetloading,setResetLoading] = useState(false);
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
  useEffect(()=>{
    
  },[])
 
if(section === "token")
{
  return (<div className='container' >
  <Formik
onSubmit={(values)=>{
  setLoading(true);
  CountDown();
  PostRequest("user/verify-otp",values,true).then((res)=>{
   setLoading(false);
   if(res.success)
   {
    setSection("new-password")
   }
  })
 }}
 validationSchema={schemaOTP}
 initialValues={{
   otp:"",
   email:email
 }} >
{({handleSubmit,handleChange,setFieldValue,values})=><div className='p-3 pt-5' >
      <div  
      
      >
        <BackBtn 
        onClick={()=>{
          setSection("forgot-password")
        }}
        />
      <div className="text-start fw-bold pt-3 ">Enter OTP</div>
        <div className="text-start sub">Enter the OTP we sent to <br/><b>heresanexample@email.com</b>:</div>
       <div className='row pt-5' >
          <div className='col-12' >
          <OtpInput
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
        <BaseButton 
        onClick={handleSubmit}
        loading={loading}
        style={{marginTop:30}}
        >Continue</BaseButton>
        <div className='text-center mb-5 mt-5'>
        <div className='fw-bold'>{timer}</div>
<div className='timmer-text' onClick={()=>{
          ResendOTP()
        }} >Didn't receive it? Resend code</div>
            </div>
            </div>
      </div>
    </div>}
  </Formik>
</div>
  )
  }
  if(section === "new-password")
  {
return <CreatePasswordScreen 
goBack={()=>{
  setSection("token");
}}
/>
  }
  return (<div className='container' >
  <Formik
onSubmit={(values)=>{
 setLoading(true);
 PostRequest("admin/forgot-password",values,true).then((res)=>{
  setLoading(false);
  if(res.success)
  {
    setSection("token");
    CountDown()
  }
 })
}}
validationSchema={schema}
initialValues={{
  email:""
}}
>
{({handleSubmit,handleChange,values})=><div className='p-3 pt-5' >
      <div  
      
      >
        <BackBtn 
        onClick={()=>{
         navigate("/"+CONSTANTS.Routes.Login)
        }}
        />
      <div className="text-start fw-bold pt-3 ">Forgot password?</div>
        <div className="text-start sub">Enter your email address below</div>
       <div className='row pt-5' >
          <div className='col-12' >
            <BaseInput
              name='email'
              type='email'
              placeholder='Work email address'
              max={100}
              onValueChange={handleChange("email")}
              value={values.email}
              required={true}
            />
            <div className='row p-2 pe-3' >
            <BaseButton 
        onClick={handleSubmit}
        loading={loading}
        style={{marginTop:30}}
        >Reset password</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>}
  </Formik>
</div>
  )
}
