import React, { useCallback, useEffect, useState } from 'react'
import { IoReloadOutline } from "react-icons/io5";
import Layout from '../components/Layout/Layout.jsx'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contextAPI/CartContext.jsx';
import "../style/HomePage.css";

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // GET ALL CATEGORIES
  const getAllCategories = useCallback(async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/all-category`);
      if (data?.success) setCategories(data.category);
    } catch (error) {
      toast.error("Error loading categories");
    }
  }, []);

  // GET TOTAL PRODUCTS COUNT
  const getTotalProductsCount = useCallback(async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/product-count`);
      setTotalCount(data?.totalCount);
    } catch (error) {
      toast.error("Error loading product count");
    }
  }, []);

  // GET FIRST PAGE PRODUCTS ONLY
  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-list/1`
      );
      setProducts(data?.products || []);
      setLoading(false);
    } catch (error) {
      toast.error("Error loading products");
      setLoading(false);
    }
  }, []);

  // LOAD MORE PRODUCTS
  const loadMore = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`
      );

      setProducts(prev => [...prev, ...(data?.products || [])]);
    } catch (error) {
      toast.error("Error loading more products");
    }
  }, [page]);

  // INITIAL LOAD
  useEffect(() => {
    getAllCategories();
    getTotalProductsCount();
    getAllProducts();
  }, []);

  // LOAD MORE ONLY WHEN page > 1
  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page, loadMore]);

  // HANDLE FILTER
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
    setPage(1);
  };

  // FILTER PRODUCTS
  const filterProducts = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      toast.error("Error applying filters");
    }
  }, [radio, checked]);

  // APPLY FILTER WITH DELAY
  useEffect(() => {
    const delay = setTimeout(() => {
      if (checked.length || radio.length) {
        filterProducts();
      } else {
        getAllProducts(); // Reset to all products
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [checked, radio, filterProducts, getAllProducts]);

  const resetFilters = () => {
    setChecked([]);   // clear category filters
    setRadio([]);     // clear price filters
    setPage(1);       // reset pagination
    getAllProducts(); // reload all products
  };
  

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
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex checkbox flex-column">
              {categories?.map((c) => (
                <Checkbox 
                key={c._id} 
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                checked={checked.includes(c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <button className='btn btn-primary mt-3' onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>

          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-3" key={p._id} style={{ width: '18rem' }}>
                <img
                  src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top card-img-fixed"
                  alt={p.name}
                  loading='lazy'
                />
                <div className="card-body d-flex flex-column">
                  <div className="flex-grow-1">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <p className="card-text card-price">$ {p.price}</p>
                  </div>

                  <div className="d-flex mt-2">
                    <button className="btn btn-primary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>

                    <button className="btn btn-dark ms-2"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ SHOW WHEN FILTER IS APPLIED & NO PRODUCTS FOUND */}
          {(checked.length > 0 || radio.length > 0) && !loading && products.length === 0 && (
            <div className="text-center mt-5">
              <h2 className="text-danger fw-bold">No Products Found</h2>
              <p className="text-muted">
                No items match your selected filters. Try adjusting your filters or reset them.
              </p>
              <button
                className="btn btn-outline-danger mt-3"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* LOAD MORE BUTTON */}
          <div className='m-2 p-3 text-center'>
            {!(checked.length || radio.length) && products.length < totalCount && (
              <button
                className='btn btn-success'
                onClick={() => setPage(prev => prev + 1)}
              >
                {loading ? "Loading..." : "Load More"} <IoReloadOutline />
              </button>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Home;
