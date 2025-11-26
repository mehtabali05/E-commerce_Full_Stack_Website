import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import AdminMenu from '../../components/Layout/AdminMenu.jsx'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../style/HomePage.css";

const Products = () => {
    const [products,setProducts] = useState([]);
 

    const getAllProducts = async () =>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/all-products`);
            // console.log(data);
            if(data?.success){
                // toast.success(data.message);
                setProducts(data.allProducts);
            }
        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(()=>{
        getAllProducts();
    },[]);
  return (
    <Layout title={"Dashboard - All Products"}>
    <div className="container-fluid admin-products">      
      <div className="row mt-3 p-2">
        <div className="col-md-3"> 
            <AdminMenu /> 
        </div>
        <div className="col-md-8 mt-3">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
                {products?.map((p) =>(
                    <Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id} className='product-link'>
                        <div className="card m-3" style={{width: '18rem',height:'26.5rem'}}>
                            <img src={`${process.env.VITE_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top card-img-fixed" style={{height: '18rem'}} alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0,30)}...</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </div>
      </div>  
    </Layout>
  )
}

export default Products
