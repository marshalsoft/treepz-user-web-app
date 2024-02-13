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
import { PageProps, UserProps } from '../../includes/types'
import { BlackCallIcon, BlackChatIcon, CallIcon } from '../../assets/icons'
export default function HistoryScreen(props:PageProps) {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState<UserProps>({});
  useEffect(()=>{
   
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
      
      
        </div>
    </div>
</div>
  )
  
}
