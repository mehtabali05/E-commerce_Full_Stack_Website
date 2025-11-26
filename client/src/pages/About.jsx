import React from 'react'
import Layout from '../components/Layout/Layout.jsx'

const About = () => {
  return (
    <Layout title={"About Us - E-commerce App"}>
      <div className="row m-5">
          <div className="col-md-6 mt-5">
                  <img src="/images/about.jpg" alt="about" style={{width:"100%"}} />
          </div>
          <div className="col-md-4 mx-auto mt-5">
            <h1 className="bg-dark p-2 text-white text-center mb-5">About</h1>
            <p className="p-2 text-center mt-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, reiciendis! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, numquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum magnam unde laudantium eos expedita aliquam. Voluptate deserunt dignissimos maxime ipsam?</p>
          </div>   
      </div>
    </Layout>
  )
}

export default About
