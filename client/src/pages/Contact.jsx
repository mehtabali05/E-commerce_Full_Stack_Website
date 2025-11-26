import React from 'react'
import {BiMailSend,BiPhoneCall} from "react-icons/bi"
import Layout from '../components/Layout/Layout.jsx'

const Contact = () => {
  return (
    <Layout title={"Contact Us - E-commerce App"}>
        <div className="row m-5">
          <div className="col-md-6 mt-5">
            <img src="/images/contactus.jpg" alt="contactUs" style={{width:"100%"}} />
          </div>
          <div className="col-md-4 mx-auto mt-5">
            <h1 className="bg-dark p-2 text-white text-center mb-5">Contact Us</h1>
            <p className="text-justify mt-2">Any query and info about product feel free to call any time we are 24x7 available</p>
            <p className="mt-3"><BiMailSend /> : mehtabalics7@gmail.com</p>
            <p className="mt-3"><BiPhoneCall /> : 0319-4604505 </p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact
