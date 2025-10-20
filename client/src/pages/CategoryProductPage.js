import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../style/CategoryProductStyle.css"
import toast from 'react-hot-toast';
import { useCart } from '../contextAPI/CartContext';

const CategoryProductPage = () => {
    const [category,setCategory] = useState("");
    const [products,setProducts] = useState([]);
    const params = useParams();
    const {addToCart} = useCart();
    const navigate = useNavigate();

    const getProductByCategory = useCallback( async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`);
            // console.log("Category Product",data);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            toast.error(error);
        }
    },[params?.slug])

    useEffect(() => {
        if(params?.slug) getProductByCategory();
    },[params?.slug,getProductByCategory]);

  return (
    <Layout>
        <div className="container category-product-page">
            <div className="row m-4">
                <h2 className="text-center m-4">Category - {category?.[0]?.name}</h2>

                <div className="d-flex flex-wrap m-3 justify-content-center">
                    {products?.map((p) =>(         
                    <div className="card m-3" key={p._id} style={{width: '18rem'}}>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} height={300} className="card-img-top" alt={p?.name} />
                            <div className="card-body d-flex flex-column ">
                                <div className='flex-grow-1'>
                                    <h5 className="card-title">{p?.name}</h5>
                                    <p className="card-text">{p.description.substring(0,30)}...</p>
                                    <p className="card-text card-price">$ {p.price}</p>
                                </div>
                                <div className='d-flex mt-2'>
                                    <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)} >More Details</button>
                                    <button className="btn btn-secondary ms-2 card-bottom"
                                    onClick={() => {
                                        addToCart(p);
                                    }}>Add to Cart</button>
                                </div>
                            </div>
                    </div>       
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProductPage
