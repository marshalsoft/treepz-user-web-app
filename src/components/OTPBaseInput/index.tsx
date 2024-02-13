import { useEffect, useState } from "react"
import './style.css';
interface OTPBaseInputProps {
    placeholder?:string;
}
export const OTPBaseInput = (props:OTPBaseInputProps)=>{
    const [inputs,setInputs] = useState<string[]>([])
    const [index,setIndex] = useState<number>(0)
    useEffect(()=>{
        setInputs(Array.from({length:4}).map((a,i)=>{
            return ""
        }))
    },[])
    const setValues = (value:string,index:number)=>{
        const values:string[] = inputs.map((a,i)=>{
          if(a == "" && index == i)
          {
            a = value;
            setIndex(index + 1)
          }
            return a
        })
        setInputs(values)
    }
    return <div 
    className="otp-wrapper"
    >
        {inputs.map((a,i)=><input
        id={"input"+i}
        key={i}
        disabled={i !== 0 && a == ""}
        maxLength={1}
        autoFocus={index == 0 || index +1 == i}
        placeholder={props?.placeholder}
       className="form-control"
       value={a}
       onChange={(d)=>setValues(d.target.value,i)}
      />)}
    </div>
}