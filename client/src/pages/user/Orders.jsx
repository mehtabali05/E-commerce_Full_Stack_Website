import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import UserMenu from '../../components/Layout/UserMenu.jsx'
import axios from 'axios'
import { useAuth } from '../../contextAPI/auth.jsx'
import moment from 'moment'
import toast from 'react-hot-toast'
const Orders = () => {
  const [orders,setOrders] = useState([]);
  const [auth] = useAuth();
  
  const getAllOrders = async () => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  useEffect(() =>{
    if(auth?.token) getAllOrders();
  },[auth?.token]);


  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="container-fluid p-2">
        <div className="row">
          <div className="col-md-3 mt-5 mb-5">
            <UserMenu />
          </div>
  
          <div className="col-md-9">
            <h1>Orders</h1>
  
            {orders?.map((o, i) => (
              <div className="border shadow mb-4" key={o._id}>
                {/* Order Table */}
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment ? "Success" : "Failure"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
  
                {/* Product List */}
                <div className="container">
                  {o?.products?.map((p) => (
                    <div
                      className="row align-items-center border rounded mb-3 p-3"
                      key={p._id}
                    >
                      {/* IMAGE COLUMN */}
                      <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
                        <img
                          src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="img-fluid mx-auto d-block"
                          style={{
                            maxWidth: "250px",
                            height: "auto",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
  
                      {/* CONTENT COLUMN */}
                      <div className="col-md-6 p-3">
                        <h4>{p.name}</h4>
                        <p className="text-muted">{p.description}</p>
                        <p className="fw-bold">Price: ${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
  

  
}

export default Orders
