import React, { useCallback, useEffect, useState } from 'react'
import { IoReloadOutline } from "react-icons/io5";
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import {Checkbox,Radio} from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contextAPI/CartContext';
import "../style/HomePage.css"; 

const Home = () => {
  const navigate = useNavigate();
  const {addToCart } = useCart();
  const [categories,setCategories] = useState([]);
  const [products,setProducts] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [totalCount,setTotalCount] = useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);


  // GET ALL CATEGORIES
const getAllCategories = useCallback( async () =>{
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`);
    if(data?.success){
      setCategories(data.category);
    }
  } catch (error) {
    toast.error(error);
  }
},[])

 
  // GET ALL PRODUCTS

  const getAllProducts = useCallback( async () =>{
    try {
        setLoading(true);
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
        setLoading(false);
        setProducts(data?.products); 
    } catch (error) {
        // console.log(error);
        toast.error("Something went wrong");
    }
},[page])




// TOTAL PRODUCTS GETTING
const getTotalProductsCount = useCallback( async () =>{
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
    setTotalCount(data?.totalCount);
  } catch (error) {
    toast.error(error);
  }
},[])



useEffect(()=>{
  getAllCategories();
  getTotalProductsCount();
},[getAllCategories,getTotalProductsCount]);


// Load More
const loadMore = useCallback( async () =>{
  try {
    setLoading(true);
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
    setLoading(false);
    setProducts((prev) => [...prev, ...data?.products]);
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong in load more");
    setLoading(false);
  }
},[page])

useEffect(()=>{
  if(page === 1) return;
  loadMore();
},[page,loadMore]);


// HANDLE FILTER 
const handleFilter = (value,id) =>{
  let all = [...checked];
  if(value){
    all.push(id);
  }else{
    all = all.filter((c)=> c!== id)
  }
  setChecked(all);
}

useEffect(()=>{
  if(!checked.length && !radio.length) {
    getAllProducts();
  } 
},[checked.length,radio.length,getAllProducts])





// FILTER PRODUCTS 
const filterProducts = useCallback( async () =>{
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`,{checked,radio});
    setProducts(data?.products);
  } catch (error) {
    toast.error(error);
  }
},[radio,checked])


useEffect(() => {
  const delay = setTimeout(() => {
    if (checked.length || radio.length) filterProducts();
  }, 400);
  return () => clearTimeout(delay);
}, [radio, checked, filterProducts]);


  return (
    <Layout title={"All Products - E-commerce App"}>
      <img
        src="/images/banner.webp"
        className="banner-img"
        alt="bannerImage"
        loading="eager"
        decoding="async"
        width="1200"
        height="400"
        style={{ objectFit: "cover", display: "block", margin: "0 auto" }}
      />

      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3">
          <div className="filters">
            <h4 className="text-center">Filter By Category </h4>
            <div className="d-flex checkbox flex-column">
              {categories?.map((c) =>(
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)} >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)} >
                    {Prices?.map((p) => (
                      <div key={p._id} >
                          <Radio value={p.array} >{p.name}</Radio>
                      </div>
                    ))}
                </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button className='btn btn-primary' onClick={()=> window.location.reload()}>Reset Filters</button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) =>(         
              <div className="card m-3" key={p._id} style={{width: '18rem'}}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top card-img-fixed" alt={p.name} loading='lazy' decoding='async' />
                    <div className="card-body d-flex flex-column">
                      <div className="flex-grow-1">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,30)}...</p>
                        <p className="card-text card-price">$ {p.price}</p>
                      </div> 
                      <div className="d-flex mt-2">
                        <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)} >More Details</button>
                        <button className="btn btn-dark ms-2 card-bottom" 
                          onClick={() => {
                            addToCart(p);
                          }} > 
                          Add to Cart 
                        </button> 
                      </div>
                    </div>
              </div>       
                ))} 
          </div>
          <div className='m-2 p-3'>
            {(checked.length > 0 || radio.length > 0) && products.length === 0 && !loading && (
                    <div className="text-center">
                        <h2 className="text-danger">😢 Products Not Found</h2>
                        <p className="lead">Please try resetting your filters or adjusting your selection.</p>
                        <button className='btn btn-outline-danger' onClick={()=> window.location.reload()}>Reset Filters</button>
                    </div>
            )}

            {!(checked.length > 0 || radio.length > 0) && products && products.length < totalCount && (
              <button className='btn btn-success' style={{textAlign:"center"}}
                onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
                }}>
                {loading ? "Loading..." : "Load More"} <IoReloadOutline className='hover:cursor'/>
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
