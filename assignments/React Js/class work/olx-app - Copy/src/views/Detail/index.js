import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../../images/avatar.png";
import phoneIcon from "../../images/telephone.png";
import chatIcon from "../../images/bubble-chat.png"
import danish from "../../images/danish.jpeg"

import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';


function Detail() {
    const {adId}= useParams()
    const [curAd, setCurAd]=useState([]);

    useEffect(()=>{
        getCurAdd()
    }, [])

const getCurAdd= ()=>{

    fetch(`https://dummyjson.com/products/${adId}`)
    .then(res => res.json())
    .then(res => setCurAd(res));

}    
const {title, thumbnail, images, price, description, brand, category, stock, rating}= curAd

    return (
        <div>
        { curAd.length === 0
       ? <div className="container adDetailBox"><h2>Loading...</h2> </div>
       
       :<div className="container adDetailBox">
        
        <div className="adInfoBox">
            <div className="adThumb"><img src={thumbnail}/></div>
            <div className="adGallery">
                {curAd.length === 0 ? "Loading..." 
                : 
                <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                >
                {images.map(item=>{ return <a href={item}><img src={item}/> </a>})  }
                </LightGallery>
}
            </div>
            <div className="adDecription">
            <h2>Rs {price}</h2>
            <h3>{title}</h3>
            </div>


            <div className="adDecription">
            <h3>Details</h3>
            <p>Brand: <strong>{brand}</strong></p>
            <p>Category: <strong>{category}</strong></p>
            <p>Stock: <strong>{stock}</strong></p>
            <p>Rating: <strong>{rating}</strong></p>
            </div>

            <div className="adDecription">
            <h3>Description</h3>
            <p>{description}</p>
            </div>

        </div>

        <div className="adContact">
            <div className="avatar-sec">
            <div><img src={danish}/></div>
            <div><h4>Danish Shaikh Qadri</h4><p><a>See Profile</a></p></div>
            </div>
            <button className="btnDark"><img src={phoneIcon} alt="phone"/> Show Phone Number</button>
            <button className="btnLight"><img src={chatIcon} alt="chat"/> Chat</button>
        </div>
        
        </div>

        }
        </div>
    )
}

export default Detail;