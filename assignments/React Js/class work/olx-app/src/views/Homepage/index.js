import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mainBanner from "../../images/main-banner1.jpg"
import mobilesCatImg from "../../images/mobiles.png"
import vehiclesCatImg from "../../images/vehicles.png"
import propertyCatImg from "../../images/property-for-sale.png"
import propertRentCatImg from "../../images/property-for-rent.png"
import electronicsCatImg from "../../images/electronics-home-appliances.png"
import bikesCatImg from "../../images/bikes.png"
import businessCatImg from "../../images/business-industrial-agriculture.png"
import servicesCatImg from "../../images/services.png"
import jobsCatImg from "../../images/jobs.png"
import animalsCatImg from "../../images/animals.png"
import furnitureCatImg from "../../images/furniture-home-decor.png"
import fashionCatImg from "../../images/fashion-beauty.png"
import booksCatImg from "../../images/books-sports-hobbies.png"
import kidsCatImg from "../../images/kids.png"

import { auth } from '../../config/firebase'

import { db } from '../../config/firebase'

import {getAds} from "../../config/firebase"

import { onAuthStateChanged} from "firebase/auth";

import { collection, query, where, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";

function Homepage() {
    const navigate = useNavigate()

    const [allAds, setAllAds] = useState([]);
    const [recentAds, setRecentAds] = useState([]);


    useEffect(() => {
        getApiData();
    }, [])

    const getApiData = async () => {
       const ads = await getAds()
       console.log(ads.userId)
       setRecentAds(ads)
       console.log("All Ads", ads)
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(res => setAllAds(res.products));
    }

console.log(recentAds)

    return (
<>
<div className="container slider-sec">
<img src={mainBanner}/>
</div>

<div className="container cat-sec">
   <h2>All Categories</h2>
   <div className="cat-list">

<div><img src={mobilesCatImg} alt="cat-img"/> <h3>Mobiles</h3></div>
<div><img src={vehiclesCatImg} alt="cat-img"/> <h3>Vehicles</h3></div>
<div><img src={propertyCatImg} alt="cat-img"/> <h3>Property for Sale</h3></div>
<div><img src={propertRentCatImg} alt="cat-img"/> <h3>Property for Rent</h3></div>
<div><img src={electronicsCatImg} alt="cat-img"/> <h3>Electronics & Home Appliances</h3></div>
<div><img src={bikesCatImg} alt="cat-img"/> <h3>Bikes</h3></div>
<div><img src={businessCatImg} alt="cat-img"/> <h3>Business, Industrial & Agriculture</h3></div>
<div><img src={servicesCatImg} alt="cat-img"/> <h3>Services</h3></div>
<div><img src={jobsCatImg} alt="cat-img"/> <h3>Jobs</h3></div>
<div><img src={animalsCatImg} alt="cat-img"/> <h3>Animals</h3></div>
<div><img src={furnitureCatImg} alt="cat-img"/> <h3>Furniture & Home Decor</h3></div>
<div><img src={fashionCatImg} alt="cat-img"/> <h3>Fashion & Beauty</h3></div>
<div><img src={booksCatImg} alt="cat-img"/> <h3>Books, Sports & Hobbies</h3></div>
<div><img src={kidsCatImg} alt="cat-img"/> <h3>Kids</h3></div>

   </div>
</div>

        <div className="container"><h2>Recently Published Ads</h2></div>
        <div className="container adSec recentAds">
            {recentAds.map(item => {
                    const { id, adTitle, adPrice, adDescription, adImages, authorFirstName , authorLastName  } = item;
                    return <div className="adBox" onClick={() => navigate(`/ad-details/${id}`)}>
                        <img src={adImages} />

                        <div className="adInfo">
                        <div className="authorName">Ad Posted By: {authorFirstName} {authorLastName }</div>
                        <h3>Rs {adPrice}</h3>
                        <h2>{adTitle}</h2>
                        <p>{adDescription}</p>
                        <button onClick={() => navigate(`/ad-details/${id}`)}> View Details</button>
                        </div>   

                    </div>
                })
            }

        </div>

        <div className="container"><h2>Featured Ads</h2></div>
        <div className="container adSec">
            {allAds.map(item => {
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
</>
    )
}

export default Homepage;