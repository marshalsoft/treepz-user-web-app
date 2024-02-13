/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Logo } from '../../components/Logo'
import { LogoDesign } from '../../components/LogoDesign'
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { CONSTANTS, DashboardNavItems } from '../../includes/constant'
import './style.css';
import { BaseLoader } from '../../components/baseloader'
import wLogo from "../../assets/images/Wakanow_logo.png"
import { CallIcon, CheckInIcon, CheckInSquareIcon, CheckOutIcon, LogoWithText } from '../../assets/icons'
import { CheckInModal } from '../../components/CheckInOutModal/checkin'
import { CheckOutModal } from '../../components/CheckInOutModal/checkout'
import ProfileScreen from '../profile'
import { GetRequest, PostRequest } from '../../includes/functions'
import HistoryScreen from '../history'
export default function DashboardScreen() {
  const [loading,setLoading] = useState(false);
  const [showCheckIn,setShowCheckIn] = useState<boolean>(false);
  const [showCheckOut,setShowCheckOut] = useState<boolean>(false);
  const [showProfile,setShowProfile] = useState<boolean>(false);
  const [showHistory,setShowHistory] = useState<boolean>(false);
  
  const GetData = ()=>{
    setLoading(true);
    GetRequest("employee/attendence/checkins-checkouts",{
      location:""
    },true).then((res)=>{
     setLoading(false);
     if(res.success)
     {
        
     }
    })
  }
  const location = useLocation();
  if(!localStorage.getItem("token"))
  {
   return <Navigate to={"/"+CONSTANTS.Routes.Login} />
  }

  return (<div className='container p-4' >
    <div >
    <div className='row pb-3' >
<div className='col-8' >
  <div className='fw-bold' >Hi, Marshall</div>
  <div className='sub' >Monday, Oct 30, 2023 | 06:30:35 PM</div>
</div>
<div className='col-4 d-flex justify-content-end align-items-end' >

<div className='dashboard-avatar'
onClick={()=>{
  setShowProfile(true)
}}
>
  AS
</div>

</div>
    </div>
    <div className='hdivider my-3' ></div>
    <div className='yellow-card p-3' >
<div className="row">
  <div className="col-5">
    <img 
    src={wLogo}
    style={{width:80}}
    />
  </div>
  <div className="col-7 fs-6 sub">
  Employee ID: 234563IJ
  </div>
</div>
<div className="row">
  <div className="col-5">
   <div >Wakanow</div>
   <div className='sub'>Victoria Island Lagos</div>
  </div>
  <div className="col-7" style={{justifyContent:"flex-end",alignItems:"flex-end",display:"flex"}}>
    <div className='yellow-button'>
    <CallIcon />
    <span className='yellow-button-text ms-1' >Call support</span>
    </div>
  </div>
</div>
    </div>
    <div className="row my-3">
    <div className="col-6 p-2">
      <div className="gray-card p-3">
        <div >
        Total Check-ins
        <span 
        className='float-right'
        onClick={()=>{
          setShowHistory(true)
        }} 
        >
        <CheckInIcon />
        </span>
        </div>
        <div className='fw-bold'>
          0
        </div>
      </div>
      </div>
      <div className="col-6 p-2">
      <div className="gray-card p-3">
        <div >
        Total Check-outs
        <span 
        className='float-right'
        onClick={()=>{
          setShowHistory(true)
        }} 
        >
        <CheckInIcon />
        </span>
        </div>
        <div className='fw-bold'>
          0
        </div>
      </div>
      </div>
    </div>
    </div>
    <div className='bottom-section'>
    <span className='float-right' >
   <LogoWithText />
   </span>
   <div className='row mt-5' >
   <div className='col-6' >
    <button
    onClick={()=>{
      setShowCheckIn(true)
    }}
    className='bordered-btn' >
      <CheckInSquareIcon />
   <span className='px-1' >Check-in</span> 
    </button>
    </div>
    <div className='col-6' >
    <button
     onClick={()=>{
      setShowCheckOut(true)
    }}
    className='black-btn' >
      <CheckInSquareIcon
      color='white'
       />
   <span className='px-1' >Check-Out</span> 
    </button>
    </div>
   </div>
    </div>
    {showCheckIn && <CheckInModal 
    goBack={()=>{
      setShowCheckIn(false) 
    }}
    />}
    {showCheckOut && <CheckOutModal
    goBack={()=>{
      setShowCheckOut(false) 
    }}
    />}
     {showProfile && <ProfileScreen
    goBack={()=>{
      setShowProfile(false) 
    }}
    />}
      {showHistory&& <HistoryScreen
    goBack={()=>{
      setShowHistory(false) 
    }}
    />}
    </div>
  )
}
interface  NavBtnProps {
id?:number
link:string;
title:string;
}
