import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart,setCart] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem("cart");
        if(existingCartItem){
            const parsedCart = JSON.parse(existingCartItem);
            if(Array.isArray(parsedCart)) {
                setCart(parsedCart);
            } else {
                setCart([]); 
                toast.error("Cart data in localStorage was corrupted and has been reset.");
            }
        }
        if(existingCartItem) setCart(JSON.parse(existingCartItem));
      },[]);

    const addToCart = (product) => {
        const existingCart = cart.find((item) => item._id === product._id);
        if(existingCart){
            const updateCart = cart.map((item) => item._id === product._id ? {...item,cartQuantity : item.cartQuantity + 1} : item);
            setCart(updateCart);
            toast.success("Product quantity updated in cart");
        }else{
            const updateCart = [...cart,{...product,cartQuantity : 1}];
            setCart(updateCart);
            toast.success("Product added to cart");
        }
    }  

    const value = {cart,setCart,addToCart}

    return (
        <CartContext.Provider value={value} >
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);

export {useCart,CartProvider};