import React, { useCallback } from 'react'
import { useState,useEffect } from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import AdminMenu from '../../components/Layout/AdminMenu.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate,useParams } from 'react-router-dom'
const {Option} = Select;

const UpdateProduct = () => {
    const params = useParams();
    const [categories,setCategories] = useState([]);
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [quantity,setQuantity] = useState("")
    const [shipping,setShipping] = useState("")
    const [category,setCategory] = useState("")
    const [photo,setPhoto] = useState("")
    const [id,setId] = useState("");
  
    const navigate = useNavigate();

     // GETTING SINGLE CATEGORIES
     const getSingleProduct = useCallback(async () =>{
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/single-product/${params.slug}`);
        
        if(data?.success){
          setName(data.product.name);
          setId(data.product._id);
          setDescription(data.product.description);
          setPrice(data.product.price);
          setQuantity(data.product.quantity);
          setShipping(data.product.shipping);
          setCategory(data.product.category._id);
        }else{
          toast.error(data?.message);
        }
      } catch (error) {
        // console.log(error);
        toast.error("Something went wrong in getting Single Product");
      }
     },[params?.slug]);

     useEffect(() => {
      if(params?.slug) getSingleProduct();
     },[params?.slug,getSingleProduct]);
  
    // GETTING ALL CATEGORIES
    const getAllCategory = async () =>{
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/all-category`);
        // console.log(data);
        if(data?.success){
          setCategories(data?.category);
        }
      } catch (error) {
        // console.log(error);
        toast.error("Something went wrong in getting Category");
      }
    }
  
    useEffect(() => {
      getAllCategory();
    },[]);
  
  
    // HANDLE CREATE PRODUCT
    const handleUpdateProduct = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("name",name);
        productData.append("description",description);
        productData.append("price",price);
        productData.append("quantity",quantity);
        photo && productData.append("photo",photo);
        productData.append("category",category);
  
        const {data} = await axios.put(`${import.meta.env.VITE_API}/api/v1/product/update-product/${id}`,productData);
        if(data?.success){
          toast.success("Product Updated Successfully");
          navigate("/dashboard/admin/products")
        }else{
          toast.error(data?.message);
        }
      } catch (error) {
        // console.log(error);
        toast.error("Something went wrong");
      }
    }

    const handleDeleteProduct = async () =>{
      try {
        let answer = window.confirm("Are you sure You want to delete this product ?");
        if(!answer) return;
        const {data} = await axios.delete(`${import.meta.env.VITE_API}/api/v1/product/delete-product/${id}`)
        
        if(data?.success){
          toast.success("Product  Successfully");
          navigate("/dashboard/admin/products")
        }
        
        
      
      } catch (error) {
        // console.log(error);
        toast.error("Something went wrong in deleting product");
      }
    }

  return (
    <Layout title={"Dashboard - Create Products"}>
      <div className="container-fluid m-3 p-2">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
              <h1>Update Product</h1>
              <div className="m-1 w-75">
                <Select placeholder="Select a Category" variant="borderLess" size='large' className='form-select mb-3' showSearch
                onChange={(value) => {setCategory(value)}} value={category} >
                  {categories?.map((c) =>(
                    <Option key={c._id} value={c._id} >{c.name}</Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-primary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className='img img-responsive' />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img src={`${import.meta.VITE_API}/api/v1/product/product-photo/${id}`} alt="product_photo" height={"200px"} className='img img-responsive' />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)} className='form-control' />
                </div>
                <div className="mb-3">
                  <textarea placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} className='form-control' />
                </div>
                <div className="mb-3">
                  <input type="number" placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} className='form-control' />
                </div>
                <div className="mb-3">
                  <input type="number" placeholder='Enter Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} className='form-control' />
                </div>
                <div className="mb-3">
                 <Select variant='borderLess' placeholder="Select shipping" size='large' className='form-select mb-3' 
                 onChange={(value) => {setShipping(value)}} value={shipping ? "Yes" : "No"}>
                   <Option value="0">No</Option>
                   <Option value="1">Yes</Option>
                 </Select>
                </div>
                <div className="d-flex">
                  <div className="mb-3">
                    <button className='btn btn-primary ' onClick={handleUpdateProduct} >Update Product</button>
                  </div>
                  <div className="mb-3">
                    <button className='btn btn-danger ms-2' onClick={handleDeleteProduct} >Delete Product</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
