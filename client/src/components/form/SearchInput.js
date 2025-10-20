import React from 'react'
import { useSearch } from '../../contextAPI/SearchContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const SearchInput = () => {
    const [values,setValues] = useSearch(); 
    
    const navigate = useNavigate(); 
    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
            // console.log("Searched product",data.products);
            setValues({...values,searchedProducts:data.products,keyword:""});
           
            navigate("/search");

        } catch (error) {
            toast.error(error.response.data?.message);
        }
    }
  return (
    <div>
        <form className="d-flex me-5" role="search" onSubmit={handleSubmit}  >
            <input className="form-control me-2" type="search" placeholder="Search" value={values.keyword}
            onChange={(e) => setValues({...values,keyword:e.target.value})} aria-label="Search"  />
            <button className="btn btn-dark" type="submit">Search</button>
        </form>

    </div>
  )
}

export default SearchInput
