import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import notFound from "../../images/not-found.jpg"

function Search() {
    const {adName}= useParams()
    const[searchedAd, setSearchedAd]=useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        getSearchedProduct()
    }, [adName])

    const getSearchedProduct= ()=>{
        fetch(`https://dummyjson.com/products/search?q=${adName}`)
        .then(res => res.json())
        // 
        // .then(res => setSearchedAd(res.products))
        .then(res => setSearchedAd(res.products))

    }

    if (searchedAd.length === 0) {
        return <div className="notFound-sec"><img src={notFound} alt="not found"/></div>;
    }
    
    return <div className="searchedAdd">
   <div className="container resultSec">
    <h1>Search Results</h1>
<h2>Results for "{adName}"</h2>
    <h3>{searchedAd.length} Match Found</h3>
   </div>
         <div className="container adSec srAds">
         {searchedAd.map(item => {
                 const { id, title, thumbnail, price, description } = item;
                 return <div className="adBox" onClick={() => navigate(`/ad-detail/${id}`)}>
                     <img src={thumbnail} />

                     <div className="adInfo">
                     <h3>Rs {price}</h3>
                     <h2>{title}</h2>
                     <p>{description}</p>
                     <button onClick={() => navigate(`/ad-detail/${id}`)}>View Details</button>
                     </div>   

                 </div>
             })
         }

     </div>

    </div>
}

export default Search;