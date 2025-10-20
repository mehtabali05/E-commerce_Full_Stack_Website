import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCategory(){
    const [categories,setCategories] = useState([]);

    const getAllCategories = async () =>{

        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`);
            // console.log(data);
            setCategories(data?.category);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getAllCategories();
    },[]);

    return categories;
}