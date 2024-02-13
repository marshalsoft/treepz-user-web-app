/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { ScannerMarker, SuccessIcon } from "../../assets/icons";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { BaseButton } from "../buttons";
import { PageProps, UserProps } from "../../includes/types";
import QrScanner from "qr-scanner";
import { PostRequest } from "../../includes/functions";

export const CheckOutModal = (props:UserProps & PageProps)=>{
    const [done,setDone] = useState<boolean>(false);
    const [visible,setVisible] = useState<boolean>(false);
    const scanner = useRef<QrScanner>();
    const videoEl = useRef<HTMLVideoElement>(null);
    const qrBoxEl = useRef<HTMLDivElement>(null);
    const [qrOn, setQrOn] = useState<boolean>(true);
    const [loading,setLoading] = useState(false);
  const onScanSuccess = ()=>{
    setLoading(true);
    PostRequest("employee/attendence/check-out",{
      location:""
    },true).then((res)=>{
     setLoading(false);
     if(res.success)
     {
        setDone(true)
     }
    })
  }
  const onScanFailed= ()=>{
    
  }
    useEffect(() => {
      if (videoEl?.current && !scanner.current) {
        // 👉 Instantiate the QR Scanner
        scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
          onDecodeError:onScanFailed,
          // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
          preferredCamera: "environment",
          // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
          highlightScanRegion: true,
          // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
          highlightCodeOutline: true,
          // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
          overlay: qrBoxEl?.current || undefined,
        });
  
        // 🚀 Start QR Scanner
        scanner?.current
          ?.start()
          .then(() => {
            setQrOn(true);
            setVisible(false)
          })
          .catch((err) => {
            setVisible(true)
            if (err) setQrOn(false);
          });
      }
  
      // 🧹 Clean up on unmount.
      // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
      return () => {
        if (!videoEl?.current) {
          scanner?.current?.stop();
        }
      };
    }, []);

    if(done)
    {
        return <div className="modal-view">
            <div className="modal-card">
            <div className="center py-3">
                <SuccessIcon />
            </div>
            <div className="fw-bold text-center">Check Out</div>
            <div className="text-center sub mb-3">You have been successfully checked out.</div>
            {/* <div className="text-center gray-card">
                <div className="row">
                <div className="col-6">
                <div className="fw-normal">Check-o Details:</div>
               <div className="sub">Date:1st Nov.,2023</div>
                </div>
                <div className="col-6">
                <div className="pt-3"></div>
               <div className="sub">Time: 04:30:13 PM</div>
                </div>
                </div>
            </div> */}
            <div className="center pt-3">
            <BaseButton 
            onClick={()=>{
                if(props.goBack)
                {
                props.goBack();
                }
            }}
            style={{width:"99%"}}
            loading={false}
            >Okay</BaseButton>
            </div>
            </div>
        </div>    
    }
    return <div className="modal-full">
   <div className="camera-section" >
   <video className="video" ref={videoEl}></video>
    {visible && <ScannerMarker 
    size={"250"}
    />}
    <span 
    onClick={()=>{
        if(props.goBack)
        {
        props.goBack();
        }
    }}
    className="float-top-left"
    >
    <CloseIcon 
    size={30}
    type="t"
    />
    </span>
    
   </div>
   <div
    className="text-section p-5 text-center"
    >
    <span>Scan the QR presented by your driver to check out of the bus.</span>
    </div>
    </div>
}