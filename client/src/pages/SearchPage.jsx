import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useSearch } from "../contextAPI/SearchContext.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextAPI/CartContext.jsx";
import "../style/HomePage.css";

const SearchPage = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const {addToCart} = useCart();

  return (
    <Layout title={"Search Results"}>
      <div className="container search-page">
        <div className="text-center m-4">
          <h1>Search Results</h1>
          {values?.searchedProducts?.length < 1 ? (
            "No Results Found"
          ) : (
            <div className="d-flex flex-wrap mt-3 justify-content-center">
              {values?.searchedProducts?.map((p) => (
                <div
                  className="card m-3 "
                  key={p._id}
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                    height={300}
                    className="card-img-top  card-img-fixed"
                    alt={p.name}
                  />
                  <div className="card-body d-flex flex-column ">
                    <div className="flex-grow-1">
                      <h5 className="card-title text-start">{p?.name}</h5>
                      <p className="card-text text-start">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-text text-start card-price">
                        $ {p.price}
                      </p>
                    </div>
                    <div className="d-flex mt-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary ms-2 card-bottom"
                        onClick={() => {
                          addToCart(p);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
