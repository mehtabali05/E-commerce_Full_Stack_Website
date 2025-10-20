import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../contextAPI/CartContext";
import { useAuth } from "../contextAPI/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import "../style/CartStyle.css";

const CartPage = () => {
  const {cart, setCart} = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        return (total = total + item.price);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      toast.error("error in total price");
    }
  };

  const removeCartItem = (pId) => {
    try {
      let myCarts = [...cart];
      let index = myCarts.findIndex((item) => item._id === pId);
      myCarts.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCarts));
      setCart(myCarts);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };



  const makePayment = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-checkout-session`,
        {
          products: cart,
        }
      );
      if (data?.success) {
        window.location.href = data?.url;
      } else {
        toast.error("Something went wrong");
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`,
        { cart },
        { withCredentials: true }
      );
      if (res.data?.ok) {
        setCart([]); // clear cart
        localStorage.removeItem("cart");
      } else {
        toast.error("Error in creating order");
      }
    } catch (error) {
      if (error.response?.data?.message === "jwt expired") {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error("Failed to place order");
      }
    }
  };

  return (
    <Layout title={"Your Shopping Cart - E-commerce App"}>
      {" "}
      <div className="container-fluid p-3">
        <div className="row">
          <h1 className="text-center bg-light p-3 mb-3 rounded shadow-sm">
            {`Hello ${
              auth?.token && auth?.user?.name ? auth.user.name : "Guest"
            }`}
          </h1>
          <h4 className="text-center mb-4">
            {cart?.length > 0
              ? `You Have ${cart.length} Items in Your Cart ${
                  auth?.token ? "" : " | Please Login to Checkout"
                }`
              : "Your Cart is Empty"}
          </h4>
        </div>
        <div className="row m-3 gap-4 align-items-start">
          <div className="col-12 col-md-6 mx-auto">
            {cart?.map((p) => (
              <div
                className="card mb-3 d-flex flex-column flex-md-row border rounded-lg shadow-sm"
                key={p._id}
              >
                <div className="col-12 col-md-4 p-3 d-flex justify-content-center align-items-center bg-light">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="img-fluid rounded"
                    alt={p.name}
                    style={{ maxHeight: "150px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-12 col-md-8 p-3 d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="mb-1">{p.name}</h4>
                    <p className="text-muted small mb-2">
                      {p.description.substring(0, 100)}...
                    </p>
                    <p className="fw-bold fs-5 text-primary">
                      Price : ${p.price}
                    </p>
                    <p className="fw-bold fs-5 text-primary">
                      Quantity : {p.cartQuantity }
                    </p>
                  </div>
                  <button
                    className="btn btn-danger btn-sm align-self-start mt-2"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {cart?.length === 0 && (
              <div className="col-12 text-center p-5 border rounded bg-white">
                <h3 className="text-muted">
                  Your cart is empty! Time to start shopping.
                </h3>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => navigate("/")}
                >
                  Go to Shopping
                </button>
              </div>
            )}
          </div>
          <div className="col-12 mx-auto col-md-4 text-center order-first order-md-last bg-light p-4 rounded shadow">
            <h2 className="mb-3">Order Summary</h2>
            <p className="text-muted">Checkout details</p>
            <hr />
            <h4 className="mb-4">
              Total Price:{" "}
              <span className="text-success fw-bold">{totalPrice()}</span>
            </h4>
            {cart.length > 0 && (
              <>
                {auth?.user?.address ? (
                  <>
                    <div className="mt-4 p-3 border rounded bg-white text-start shadow-sm">
                      <h5 className="mb-2 text-dark">Shipping To:</h5>
                      <p className="text-break mb-1">{auth.user.address}</p>
                    </div>
                    <button
                      className="btn btn-outline-primary w-100 mt-3"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Shipping Address
                    </button>
                    <button
                      className="btn btn-success w-100 mt-3 py-2 fs-5 shadow-sm"
                      onClick={() => makePayment()}
                    >
                      Proceed to Payment
                    </button>
                  </>
                ) : (
                  <div className="mb-3 mt-4">
                    <button
                      className="btn btn-warning w-100 py-2 fs-5 shadow"
                      onClick={() =>
                        navigate(
                          auth?.token ? "/dashboard/user/profile" : "/login",
                          {
                            state: "/cart",
                          }
                        )
                      }
                    >
                      {auth?.token
                        ? "Update Address to Checkout"
                        : "Please Login to Checkout"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
