/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { GetRequest, PostRequest } from '../../includes/functions'
import { BackBtn } from '../../components/BackBtn'
import { PageProps, UserProps } from '../../includes/types'
import { BlackCallIcon, BlackChatIcon, CallIcon } from '../../assets/icons'
import { BaseLoader } from '../../components/baseloader'
const schema = y.object({
  firstname:y.string().required("First name is required."),
  lastname:y.string().required("Last name password is required."),
  email:y.string().required("Email is required."),
  })
export default function ProfileScreen(props:PageProps) {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [fetching,setFetching] = useState(true);
  const [user,setUser] = useState<UserProps>({});
  const getEmployeeData = ()=>{
    setFetching(true);
    GetRequest("employee",{}).then((res)=>{
      setFetching(false);
      if(res.success)
      {
        setUser(res.data);
      }
    })
  }
  useEffect(()=>{
   getEmployeeData();
  },[])
  if(fetching)
  {
    return <div className='modal-full p-3' >
      <BaseLoader />
      <span className='px-2'>Fetching data...</span>
    </div>
  }
  return (<div className='modal-full' >
  <Formik
onSubmit={(values)=>{
  setLoading(true);
  PostRequest("patch:employee",{
    name:user?.firstname+" "+user?.lastname,
    location:""
  },true).then((res)=>{
   setLoading(false);
   if(res.success)
   {
    if(props.goBack)
    {
     props.goBack()
    }
   }
  })
 }}
validationSchema={schema}
initialValues={{
  firstname:"",
  lastname:"",
  email:"",
  location:"",
  companyName:"",
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
      <div className="text-center fw-bold pt-3 " style={{marginTop:-40}}>My Profile</div>
      <div className='center'>
        <div className='dashboard-avatar' style={{width:80,height:80,marginTop:30}}

        >
          AS
        </div>
      </div>
       <div className='row ps-3' >
       <div className='row pt-3' style={{width:"100%"}} >
       <div className='col-6' >
       <BaseInput 
        name='firstname'
        type='text'
        max={50}
        disabled
        placeholder='First name'
        onValueChange={handleChange("firstname")}  
        value={user.firstname}
        required={true}
        />
        </div>
        <div className='col-6' >
       <BaseInput 
         name='lastname'
         type='text'
         max={50}
         disabled
         placeholder='Last name'
         onValueChange={handleChange("lastname")}  
         value={user.lastname}
         required={true}
         />
        </div>
        </div>
        <div className='row' >
        <BaseInput 
        name='email'
        type='email'
        disabled={true}
        placeholder='Email Address'
        onValueChange={handleChange("email")}  
         value={user.email}
        required={true}
        />
        <BaseInput 
        name='location'
        type='text'
        max={50}
        placeholder='Location'
        onValueChange={handleChange("location")}  
         value={values.location}
        />
        <BaseInput 
        name='company_name'
        type='text'
        max={50}
        placeholder='Company'
        onValueChange={handleChange("companyName")}  
         value={values.companyName}
        />
        </div>
        <div className='row ' >
        <BaseButton 
        onClick={handleSubmit}
        loading={loading}
        style={{marginTop:0}}
        >Save changes</BaseButton>
        <div className='center pt-3' >
          <span className='error' onClick={()=>{
            localStorage.removeItem("userdata");
            navigate("/"+CONSTANTS.Routes.Login);
          }}>Log Out</span>
        </div>
        <div  style={{width:"100%",marginTop:20}} >
        Contact support
          <span className='float-right' >
            <span 
            onClick={()=>{

            }}
            >
            <BlackChatIcon />
            </span>
            <span
            onClick={()=>{
              
            }}
            >
            <BlackCallIcon />
            </span>
          </span>
        </div>
          </div>
        </div>
        </div>
    </div>}
  </Formik>
</div>
  )
  
}
