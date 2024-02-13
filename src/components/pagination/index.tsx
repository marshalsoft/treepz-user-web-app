import React, { useRef, useState,RefObject, useEffect } from "react";
import './style.css';
import { CaretDownIcon } from "../../assets/icons";
interface PaginationProps {
    totalPages?:number;
    prevPage?:number;
    nextPage?:number;
    filteredRow?:number;
    onFilterRow?:(filteredRow:number)=>void;
    onPage?:(page:number)=>void;
}
export const Pagination = (props:PaginationProps)=>{
    const [ currentPage,setCurrentPage] = useState<number>(1);
    const [ totalPages,setTotalPages] = useState<number>(11);
    const [ selectedNumberOfRows,setSelectedNumberOfRows] = useState<number>(10);
    const [ showRowFilter,setShowRowFilter] = useState<boolean>(false);
    const popOver = useRef(null) as RefObject<HTMLDivElement>
    useEffect(()=>{
        popOver.current?.addEventListener("mouseleave",()=>{
            setShowRowFilter(false) 
        })  
        setTotalPages(11);
    },[showRowFilter])
    return <div className="row" >
        <div className="col-8 d-flex align-items-center ">
        <span className="pagination-btn">Showing</span>
        <span className='bx-rw'
       style={{width:40,height:30}} 
       >
        <div 
        onClick={()=>{
           setShowRowFilter(!showRowFilter) 
        }}
        className="d-flex align-items-center justify-content-center"
        style={{padding:3.7}}
        >
        <span 
       style={{fontSize:14}} 
       >{selectedNumberOfRows} rows</span>
        <CaretDownIcon />
        </div>
        <div 
        ref={popOver}
        >
        {showRowFilter && <ul  className="bx-rw-dropdown">
        {[10,30,50,100].map((a,i)=><li 
            key={i}
            onClick={()=>{
                if(props.onFilterRow)
                {
                    props.onFilterRow(a)
                }
                setSelectedNumberOfRows(a);
                setShowRowFilter(false) 
            }}
            >{a}</li>)}
        </ul>}
        </div>
       </span>

        </div>
        <div className="col-4">
        <div className="pagination-container" >
            <span className="pagination-btn" onClick={()=>{
                if(currentPage > 1)
                {
                    setCurrentPage(currentPage - 1) 
                 if(props.onPage)
                {
                    props.onPage(currentPage - 1)
                } 
                }
            }}>Prev</span>
            <span className={`pagination-btn pagination-btn-active`}>{currentPage}</span>
            <span className="pagination-btn">of</span>
            <span className="pagination-btn">{totalPages}</span>
            <span className="pagination-btn"
             onClick={()=>{
                if(currentPage < totalPages)
                {
                    setCurrentPage(currentPage + 1)  
                    if(props.onPage)
                    {
                        props.onPage(currentPage + 1)
                    }
                }
            }}
            >Next</span>
        </div>
        </div>
    </div>
}