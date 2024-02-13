
import { toast} from 'react-toastify';
import { CONSTANTS } from './constant';

export interface APIResponse {
    success:boolean;
    data?:any;
    message:string;
    statusCode?:string;
}
export const PostRequest = (uri:string,data:any,success?:boolean)=>{
    return new Promise<APIResponse>((resolve)=>{
    const formdata = new FormData();
    Object.keys(data).forEach((ob,i)=>{
    formdata.append(ob,data[ob]);
   })
    const RequestHeaders = new Headers();
    RequestHeaders.append("Content-Type", "application/json");
   const token = localStorage.getItem("token");
    if(token !== null)
    {
     const bearer = `Bearer ${token}`;
     RequestHeaders.append("Authorization",bearer);
     console.log(bearer);
    }
    var getMethod = "post";
    if(String(uri).includes(":"))
    {
      getMethod = String(uri).split(":")[0];
      uri = String(uri).split(":")[1];
    }
    const options:RequestInit = {
        headers:RequestHeaders,
        method:getMethod,
        body:JSON.stringify(data)
    }
fetch(`${CONSTANTS.BaseURL}${uri}`,options).then((res)=>res.json()).then((res:APIResponse)=>{
    if(res.success)
    {
    if(success)
    {
    toast.success(res.message, {
        position:"top-center"
      });
    }
    try {
        if(res.data.token)
        {
          localStorage.setItem("token",res.data.token);
        }  
        if(res.data.verifytoken)
        {
          localStorage.setItem("token",res.data.verifytoken);
        } 

    } catch (error) {
        
    }
    resolve(res)
    }else{
    toast.error(res.message, {
      position:"top-center"
     });  
     resolve(res)
    }
}).catch((e)=>{
    toast.error(e.message, {
        position:"top-center"
       });
    resolve({
        success:false,
        message:e.message,
        data:{}
    }) 
})
})
}
export const GetRequest = (uri:string,data:any,success?:boolean)=>{
    return new Promise<APIResponse>((resolve)=>{
    var params:string[] = [];
    Object.keys(data).forEach((ob,i)=>{
        params.push(`${ob}=${data[ob]}`);
   })
    const RequestHeaders = new Headers();
    RequestHeaders.append("Content-Type", "application/json");
   const token = localStorage.getItem("token");
    if(token !== null)
    {
     RequestHeaders.append("Authorization",`Bearer ${token}`);
    }
    const options:RequestInit = {
        headers:RequestHeaders,
        method:"get",
    }
fetch(`${CONSTANTS.BaseURL}${uri}${params}`,options).then((res)=>res.json()).then((res:APIResponse)=>{
    if(res.success)
    {
    if(success)
    {
    toast.success(res.message, {
        position:"top-center"
      });
    }
    try {
        if(res.data.token)
        {
          localStorage.setItem("token",res.data.token);
        }  
        if(res.data.verifytoken)
        {
          localStorage.setItem("token",res.data.verifytoken);
        } 

    } catch (error) {
        
    }
    resolve(res)
    }else{
    toast.error(res.message, {
      position:"top-center"
     });  
     resolve(res)
    }
}).catch((e)=>{
    toast.error(e.message, {
        position:"top-center"
       });
    resolve({
        success:false,
        message:e.message,
        data:{}
    }) 
})
})
}
export const ValidateEmail = (value:string)=>{
    const valid = value.match(
        /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    return valid;
  }
  