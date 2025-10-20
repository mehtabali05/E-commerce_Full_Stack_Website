import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useAuth } from '../../contextAPI/auth';
import moment from 'moment'
import { Select } from 'antd';
import toast from 'react-hot-toast';
const {Option} = Select;

const AdminOrders = () => {
    const [status] = useState(["Not Process","Processing","Shipped","delivered","cancel"]);
   

    const [orders,setOrders] = useState([]);
    const [auth] = useAuth();
    
    const getAllOrders = async () => {
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
        // console.log("Orders Data",data);
        setOrders(data);
      } catch (error) { 
        toast.error(error.response?.data?.message);
      }
    }
  
    useEffect(() =>{
      if(auth?.token) getAllOrders();
    },[auth?.token]);

    const handleOrderStatus = async (orderId,value)=> {
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/order-status/${orderId}`, {status: value});
            if(data?.success){
                toast.success("Order Status Updated");
                getAllOrders();
            }    
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid p-2">
        <div className="row">
            <div className="col-md-3 mt-5 mb-5">
                <AdminMenu />
            </div> 
            <div className="col-md-9">
                <h1 className="text-center">All Orders</h1>

                 {orders?.map((o,i) => {
                                return (
                                  <div className="border shadow mb-4" key={o._id} >
                                    <table className='table' >
                                        <thead>
                                          <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Status</th>
                                            <th scope='col'>Buyer</th>
                                            <th scope='col'>date</th>
                                            <th scope='col'>Payment</th>
                                            <th scope='col'>Quantity</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>{i + 1}</td>
                                            <td>
                                                <Select variant= {false} onChange={(value) => handleOrderStatus(o._id,value)} defaultValue={o?.status} >
                                                    {status.map((s,i) => (
                                                        <Option key={i} value={s} >{s}</Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment ? "Success" : "Failure"}</td>
                                            <td>{o?.products?.length}</td>
                                          </tr>
                                        </tbody>
                                    </table>
                                    <div className="container"> 
                                    {o?.products?.map((p) => (
                                  <div className="row align-items-center border rounded mb-3 p-3" key={p._id} >
                                    <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
                                      <div className="card m-3 mx-auto d-block" key={p._id} style={{width: '12rem'}}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                      </div>   
                                    </div>
                                    <div className="col-md-6 p-3">
                                      <h4>{p.name}</h4>
                                      <p className="text-muted">{p.description}</p>
                                      <p className="fw-bold">Price : {p.price}</p>
                                      
                                    </div>
                                  </div>
                                ))}
                                    </div>
                                  </div>
                                )
                              })}
            </div>
        </div> 
      </div>  
    </Layout>
  )
}

export default AdminOrders
