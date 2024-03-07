export const CONSTANTS = {
    BaseURL:"https://admin.business.treepz.com/",//"http://3.255.45.79:3000/",
    Routes:{
      Login:"login",
      Otp:"otp",
      ForgotPassword:"forgot_password",
      Dashboard:"dashboard",
      TreepzHistory:"treepz-history",
      EmployeeData:"employee-data",
      CreatePassword:"create_password",
      Settings:"settings",
      Profile:"profile"
    }
}

interface ListProps {
icon?:JSX.Element;
title:string;
link:string;
}

export const DashboardNavItems:ListProps[] = [
  {title:"Dashboard",link:"/"+CONSTANTS.Routes.Dashboard},
  {title:"Treepz History",link:"/"+CONSTANTS.Routes.Dashboard+"/"+CONSTANTS.Routes.TreepzHistory},
  {title:"Employee Data",link:"/"+CONSTANTS.Routes.Dashboard+"/"+CONSTANTS.Routes.EmployeeData},
] 