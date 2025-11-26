import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "../../style/authStyle.css"


const ResetPassword = () => {
    const [formData,setFormData] = useState({
        otp:"",
        password:"",
        confirmPassword:""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        Object.assign(formData, { email: localStorage.getItem("resetEmail") });
        // console.log(formData);
        try{
            const {data} = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/change-password`,formData);
            // console.log("Forgot Password Response",data);
            if(data && data.success){
                toast.success(data.message);

                navigate("/login");
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.response?.data?.message || "Password Reset Failed");
        }
    }

  return (
    <Layout title={"Forgot Password - E-commerce App"}>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h4 className='title'>RESET PASSWORD</h4>
                    <div className="mb-3">      
                        <input autoComplete='otp' name='otp' type="text" maxLength={6} placeholder='Enter Your Otp' className="form-control" id="exampleInputEmail" value={formData.otp} onChange={(e) => setFormData({...formData,otp:e.target.value})} required  />
                    </div>

                    <div className="mb-3">
                        <input autoComplete='new-password' name='password' type="password" placeholder='Enter Your New Password' className="form-control" id="exampleInputPassword" value={formData.password} onChange={(e) => setFormData({...formData,password:e.target.value})} required  />
                    </div>

                    <div className="mb-3">
                        <input autoComplete='confirm-password' name='confirmPassword' type="password" placeholder='Confirm Your New Password' className="form-control" id="exampleInputPassword" value={formData.confirmPassword} onChange={(e) => setFormData({...formData,confirmPassword:e.target.value})} required  />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">RESET</button>
            </form>
        </div>
    </Layout>
  )
}

export default ResetPassword
