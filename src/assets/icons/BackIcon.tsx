interface GoBackIconProps {
color?:string;
size?:number;
}
export const GoBackIcon = ({color = "black",size = 20}:GoBackIconProps)=>{
return <svg width={size} height={size} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 6V10L0 5L6 0V4H11C13.1217 4 15.1566 4.84285 16.6569 6.34315C18.1571 7.84344 19 9.87827 19 12C19 14.1217 18.1571 16.1566 16.6569 17.6569C15.1566 19.1571 13.1217 20 11 20H2V18H11C12.5913 18 14.1174 17.3679 15.2426 16.2426C16.3679 15.1174 17 13.5913 17 12C17 10.4087 16.3679 8.88258 15.2426 7.75736C14.1174 6.63214 12.5913 6 11 6H6Z" fill={color}/>
</svg>

}