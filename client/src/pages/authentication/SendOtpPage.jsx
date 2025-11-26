import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate,useLocation, Link } from 'react-router-dom';
import "../../style/authStyle.css"

const SendOtpPage = () => {
 
    const [email,setEmail] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/email-send`,{email});
            // console.log("Send OTp response ",data);
            if(data && data.success){
                toast.success(data.message);
                
                try {
                    localStorage.setItem("resetEmail",email);
                } catch (err) {
                    toast.error("Failed to store resetEmail in localStorage");
                }

                navigate("/reset-password");

            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }
    }


  return (
    <Layout title={"Reset - E-commerce App"}>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h4 className='title'>RESET PASSWORD</h4>
                    <div className="mb-3">      
                        <input autoComplete="email" name='email' type="email" placeholder='Enter Your Email' className="form-control" id="exampleInputEmail" value={email} onChange={(e) => setEmail(e.target.value)} required  />
                    </div>

                    

                    <button type="submit" className="btn btn-primary me-3">Send Otp</button>
                    <Link onClick={()=> navigate(-1)} >Back</Link>
            </form>
        </div>
    </Layout>
  )
}

export default SendOtpPage
