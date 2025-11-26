import { useState, useContext,createContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({
        user: null,
        token: ""
    });

    axios.defaults.withCredentials = true;


      // ✅ Update Authorization header dynamically
    useEffect(() => {
      axios.defaults.headers.common["Authorization"] = auth?.token ? `Bearer ${auth.token}` : "";
    }, [auth.token]);

    const fetchUser = async () => {
      try {
        if (localStorage.getItem("loggedOut") === "true") return;
        const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/user-auth`);
        // console.log("User auth data:", data);
        if(data.success && data.user){
          const updatedAuth = { user: data.user, token: data.token };
          setAuth(updatedAuth);
          localStorage.setItem("auth", JSON.stringify(updatedAuth));
        }
      } catch (error) {
        if(error.response?.status === 401){
          setAuth({user: null, token: "" });
          localStorage.removeItem("auth");
        }else{
          toast.error(error.response?.data?.message || "Error fetching user auth data:");
        }
      }
    }

      // ✅ Load from localStorage on first mount
    useEffect(() => {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          if (parsed.user && parsed.token) {
            setAuth(parsed);
          }
        } catch (e) {
          toast.error("Failed to parse auth data from localStorage");
          // console.error("Invalid auth data in localStorage");
          localStorage.removeItem("auth");
        }
      }
      fetchUser();
    }, []);
    
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}

// CUSTOM HOOK
const useAuth = () => useContext(AuthContext);

export {useAuth,AuthProvider};

