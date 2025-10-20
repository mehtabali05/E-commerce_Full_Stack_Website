import React from 'react'
import { useState,useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'
const {Option} = Select;

const CreateProduct = () => {
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [quantity,setQuantity] = useState("")
  const [category,setCategory] = useState("")
  const [photo,setPhoto] = useState("")

  const navigate = useNavigate();

  // GETTING ALL CATEGORIES
  const getAllCategory = async () =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`);
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
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("photo",photo);
      productData.append("category",category);

      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,productData);
      if(data?.success){
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }else{
        toast.error(data?.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout title={"Dashboard - Create Products"}>
      <div className="container-fluid mt-3 p-2">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8 mt-3">
              <h1>Create Products</h1>
              <div className="m-1 w-80">
                <Select placeholder="Select a Category" variant="borderLess" size='large' className='form-select mb-3' showSearch
                onChange={(value) => {setCategory(value)}}>
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
                  {photo && (
                    <div className="text-center">
                      <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className='img img-responsive' />
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
                  <button className='btn btn-primary' onClick={handleCreateProduct} >Create Product</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
