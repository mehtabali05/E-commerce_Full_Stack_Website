import { useState,useEffect } from "react";
import { useAuth } from "../../contextAPI/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from './../Spinner';

export default function PrivateRoute(){
    const [ok,setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() =>{
        const authCheck = async () =>{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`,{withCredentials:true,});
            console.log("object in private route",res.data);
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false); 
            }
        };
        if(auth?.token){
            console.log("Token in PrivateRoute",auth?.token);
            authCheck();
        } 
    },[auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
}

