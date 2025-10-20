import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "../../style/authStyle.css"
const Register = () => {
  
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    // HandleChange function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,formData);
            // console.log("Response from register api ",data);
            if(data.success){
                toast.success(data.message);
                navigate("/login");
            }else{
                toast.error(data.message);
                // navigate("/register");
            }
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }
    }

  return (
    <Layout title={"Register - E-commerce App"}>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h4 className='title'>REGISTER FORM</h4>
           
                    <div className="mb-3">  
                        <input autoComplete="name" name='name' type="text" placeholder='Enter Your Name' className="form-control" id="exampleInputName" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">      
                        <input autoComplete="email" name='email' type="email" placeholder='Enter Your Email' className="form-control" id="exampleInputEmail" value={formData.email} onChange={handleChange} required  />
                    </div>

                    <div className="mb-3">
                        <input autoComplete="password" name='password' type="password" placeholder='Enter Your Password' className="form-control" id="exampleInputPassword" value={formData.password} onChange={handleChange} required  />
                    </div>
               
                    <div className="mb-3">
                        <input autoComplete="phone" name='phone' type="text" placeholder='Enter Your Phone' className="form-control" id="exampleInputPhone" value={formData.phone} onChange={handleChange} required  />
                    </div>
                
                    <div className="mb-3">
                        <input autoComplete="address" name='address' type="text" placeholder='Enter Your Address' className="form-control" id="exampleInputAddress" value={formData.address} onChange={handleChange} required  />
                    </div>
                
               
                    <button type="submit" className="btn btn-primary">REGISTER</button>
            </form>
        </div>
    </Layout>
  )
}

export default Register
