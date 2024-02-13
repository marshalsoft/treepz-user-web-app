/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Logo } from '../../components/Logo'
import { LogoDesign } from '../../components/LogoDesign'
import { PoweredByComponent } from '../../components/PoweredBy'
import BaseInput from '../../components/baseInput'
import { NavLink, useNavigate} from 'react-router-dom'
import { CONSTANTS } from '../../includes/constant'
import { BaseButton, LightYellowButton } from '../../components/buttons'
import * as y from 'yup';
import { BackBtn } from '../../components/BackBtn'
import { HistoryProps, PageProps, UserProps } from '../../includes/types'
import { BlackCallIcon, BlackChatIcon, CallIcon, CarHistoryIcon } from '../../assets/icons'
import { GetRequest, PostRequest } from '../../includes/functions'
import { BaseLoader } from '../../components/baseloader'
export default function HistoryScreen(props:PageProps) {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState<UserProps>({});
  const [history,setHitsory] = useState<HistoryProps[]>(Array.from({length:50}).map((a,i)=>{
    return {
      status:"check-in"
    }
  }));
  const GetHistory = ()=>{
    setLoading(true);
    GetRequest("employee/attendence",{},false).then((res)=>{
      setLoading(false);
      if(res.success)
      {
        // setHitsory(res.data);
      }
    })
  }
  useEffect(()=>{
   GetHistory();
  },[])
  return (<div className='modal-full' >
  <div className='p-3 pt-5' >
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
      <div className="text-center fw-bold pt-3 " style={{marginTop:-40}}>Commute history</div>
     
     {loading?<div className='mt-3 fs-7'><BaseLoader /> fetching history...</div>:history.length === 0?<div className='alert alert-danger mt-3'>No history found</div>:null}
      <div className='list' >
      {history.map((a,i)=><div key={i} className='list-item  p-2 ' >
        <CarHistoryIcon />
        <div className='ps-3' >
          <div className='fs-7-b'>Asbury mall, Lekki</div>
          <div  className='fs-7'>23 Oct, 04:00:45 PM</div>
        </div>
        <div  className={`fs-7 fw-bold lst ${String(a?.status).toLowerCase()}`}>Checked in</div>
      </div>)}
      </div>
      </div>
        </div>
</div>
  )
  
}
