import { useState, useContext,createContext} from "react";
const SearchContext = createContext();

const SearchProvider = ({children}) =>{
    const [values,setValues] = useState({
        keyword: "",
        searchedProducts: [],
    });

    return(
        <SearchContext.Provider value={[values,setValues]}> 
            {children}
        </SearchContext.Provider>
    );
}

// CUSTOM HOOK
const useSearch = () => useContext(SearchContext);

export {useSearch,SearchProvider};