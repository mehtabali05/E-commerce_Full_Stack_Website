import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({children,
    title = "Shop Now - Best Deals",
    description = "A complete MERN stack e-commerce website for watches, shoes, and apparel.",
    keywords = "e-commerce, mern, react, node, watches, shoes, apparel",
    author = "Mehtab Ali"}) => {
  return (
    <div className='my-container'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>

      <Header />
      <main style={{minHeight: "80vh"}}>
      <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  )
}


export default Layout
