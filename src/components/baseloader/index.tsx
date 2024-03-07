export const BaseLoader = (props:{color?:string})=>{
    return <div className={`spinner-border spinner-border-sm`} style={{borderRightColor:props.color}} role="status">
    </div>
}