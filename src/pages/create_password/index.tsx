import React, { useEffect, useState } from 'react'
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
import { PageProps } from '../../includes/types'
const schema = y.object({
    password:y.string().required("Password is required."),
    confirmPassword:y.string().required("Confirm password is required."),
    })
export default function CreatePasswordScreen(props:PageProps) {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem(CONSTANTS.Routes.ForgotPassword))
    {
      localStorage.removeItem(CONSTANTS.Routes.ForgotPassword)
    }
  },[])
  return (<div className='container' >
  <Formik
onSubmit={(values)=>{
  setLoading(true);
  PostRequest("admin/forgot-password",values,true).then((res)=>{
   setLoading(false);
   if(res.success)
   {
     window.location.href = "/"+CONSTANTS.Routes.Otp;
   }
  })
 }}
validationSchema={schema}
initialValues={{
  password:"",
  confirmPassword:"",
}}
>
{({handleSubmit,handleChange,values})=><div className='p-3 pt-5' >
      <div  
      
      >
        <BackBtn 
        onClick={()=>{
          if(props.goBack)
          {
            props.goBack();
            return ;
          }
        }}
        />
      <div className="text-start fw-bold pt-3 ">Create a new password</div>
        <div className="text-start sub">Enter a new secure password</div>
       <div className='row pt-5' >
       <BaseInput 
        name='password'
        type='password'
        max={50}
        placeholder='Enter new password'
        onValueChange={handleChange("password")}  
         value={values.password}
        required={true}
        />
        <BaseInput 
        name='confirm_password'
        type='password'
        max={50}
        placeholder='Confirm new password'
        onValueChange={handleChange("confirmPassword")}  
         value={values.confirmPassword}
        required={true}
        />
        <div className='row p-2 pe-3' >
        <BaseButton 
        onClick={handleSubmit}
        loading={loading}
        style={{marginTop:30}}
        >Create password</BaseButton>
          </div>
        </div>
      </div>
    </div>}
  </Formik>
</div>
  )
  
}
