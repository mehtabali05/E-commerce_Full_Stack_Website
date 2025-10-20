import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate,useLocation, Link } from 'react-router-dom';
import "../../style/authStyle.css"
import { useAuth } from '../../contextAPI/auth';
const Login = () => {
 
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });

    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,formData);

            if(data && data.success){
                toast.success(data.message);
                const newAuth = { user: data.user, token: data.token };
                setAuth(newAuth);


                try {
                    localStorage.setItem("auth", JSON.stringify(newAuth));
                } catch (err) {
                    toast.error("Failed to store auth in localStorage");
                }

                // console.log("Auth in login ",auth);

                navigate(location.state || "/");
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }
    }

  return (
    <Layout title={"Login - E-commerce App"}>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h4 className='title'>LOGIN FORM</h4>
                    <div className="mb-3">      
                        <input autoComplete="email" name='email' type="email" placeholder='Enter Your Email' className="form-control" id="exampleInputEmail" value={formData.email} onChange={(e) => setFormData({...formData,email:e.target.value})} required  />
                    </div>

                    <div className="mb-3">
                        <input autoComplete="password" name='password' type="password" placeholder='Enter Your Password' className="form-control" id="exampleInputPassword" value={formData.password} onChange={(e) => setFormData({...formData,password:e.target.value})} required  />
                    </div>

                    <div className="mb-3">
                        <Link className='cursor-pointer' to={"/forgot-password"} >Forgot Password ?</Link>
                    </div>

                    <button type="submit" className="btn btn-primary">LOGIN</button>
                    <p className="text-gray-500 text-sm mt-3 mb-11">
                        Don’t have an account?{" "}
                        <Link to={"/register"} className="text-primary" > 
                            Sign up
                        </Link>
                    </p> 
            </form>
        </div>
    </Layout>
  )
}

export default Login
