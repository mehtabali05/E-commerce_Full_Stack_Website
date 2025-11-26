import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout.jsx'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "../style/ProductDetails.css"
import { useCart } from '../contextAPI/CartContext.jsx'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import "../style/HomePage.css"

 
const ProductDetails = () => {
    const params = useParams();
    const [product,setProduct] = useState({});
    const [relatedProducts,setRelatedProducts] = useState([]);
    const {addToCart} = useCart();
    const navigate = useNavigate();
   

    const getProductDetails = useCallback( async () =>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/single-product/${params.slug}`);
            // console.log(data);
            setProduct(data?.product);
            similarProducts(data?.product?._id,data?.product?.category?._id)
        } catch (error) {
            toast.error(error);
        }
    },[params?.slug]);

    useEffect(()=> {
        if(params?.slug) getProductDetails();
    },[params?.slug,getProductDetails]);

    const similarProducts = async (pId,cId) => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/related-products/${pId}/${cId}`);
            setRelatedProducts(data?.relatedProducts);
        } catch (error) {
            toast.error(error);
        }
    }
  return (
    <Layout>
        <div className="row container max-w-7xl mt-5 product-detail-page">
            <div className="col-md-6 mx-auto mb-3" style={{width: '20rem'}}>
                <img src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top max-h-[500px] object-contain" alt={product.name} />
            </div>
            <div className="col-md-6 mx-auto">
                <h1 className="text-center">Product Details</h1>
                <div className="d-flex flex-column gap-2">
                    <p><span className='fw-bold'>Product </span>: {product.name}</p>
                    <p><span className='fw-bold'>Description</span> : {product.description}</p>
                    <p className='text-success'><span className='fw-bold'>Price</span> : $ {product.price}</p>
                    <p><span className='fw-bold'>Category</span> : {product?.category?.name}</p>
                </div>
                <button className="btn btn-success mt-2 card-bottom"
                onClick={() => {
                    addToCart(product);
                  }}>Add to Cart</button>
            </div>
        </div> 
        <hr />
        <div className="row container m-3 product-detail-page">
            <h1>Similar Products</h1>
            {relatedProducts.length === 0 && ( <p className='text-center'>No Product Found</p>)}
            <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) =>(         
              <div className="card m-3" key={p._id} style={{width: '18rem'}}>
                  <img src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top card-img-fixed" alt={p.name} />
                    <div className="card-body d-flex flex-column">
                        <div className='flex-grow-1'>
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
        </div>
    </Layout>
  )
}

export default ProductDetails
