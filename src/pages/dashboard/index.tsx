/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
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
import { UserProps } from '../../includes/types'
import moment from 'moment'
export default function DashboardScreen() {
  const [fetching,setFetching] = useState(false);
  const [loading,setLoading] = useState(false);
  const [showCheckIn,setShowCheckIn] = useState<boolean>(false);
  const [showCheckOut,setShowCheckOut] = useState<boolean>(false);
  const [showProfile,setShowProfile] = useState<boolean>(false);
  const [showHistory,setShowHistory] = useState<boolean>(false);
  const [user,setUser] = useState<UserProps>();
  const [stats,setStats] = useState<any>();
  const GetUserData = ()=>{
    setFetching(true);
    GetRequest("employee",{},false).then((res)=>{
     setFetching(false);
     console.log(res);
     if(res.success)
     {
        localStorage.setItem("userdata",JSON.stringify(res.data))
        setUser(res.data);
     }
    })
  }
  useEffect(()=>{
    GetUserData();
    GetData();
  },[])
  const GetData = ()=>{
    setLoading(true);
    GetRequest("employee/attendence/my-checkins-checkouts",{},false).then((res)=>{
     setLoading(false);
     if(res.success)
     {
      setStats(res.data);
     }
    })
  }
  if(!localStorage.getItem("token"))
  {
   return <Navigate to={"/"+CONSTANTS.Routes.Login} />
  }
  if(fetching)
  {
    return <div className='fullscreen'  >
      <BaseLoader />
      <span className='px-2'>Fetching data...</span>
    </div>
  }
  if(!localStorage.getItem("userdata"))
  {
   return <Navigate to={"/"+CONSTANTS.Routes.Login} />
  }
  return (<div className='container p-4' >
    <div >
    <div className='row pb-3' >
<div className='col-8' >
  <div className='fw-bold' >Hi, {user?.firstname}</div>
  <div className='sub' >{moment().format("MMM DD, YYYY")} | {moment().format("hh:mm:ss A")}</div>
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
  Employee ID: {user?.employeeId}
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
        {stats?.checkIn}
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
        {stats?.checkOut}
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
