import Swal from 'sweetalert2'
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

import { db } from '../../config/firebase'

import { getDoc, getDocs, doc, query, collection, where } from "firebase/firestore";

import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../Store/cartSlice'


function AdDetail() {
    const {adId}= useParams()
    const [curAd, setCurAd]=useState(null);
    const [adAuthor, setAdAuthor]=useState(null);

    const dispatch = useDispatch()

    useEffect(()=>{
        getCurAd()
    }, [])

    const getCurAd = async () => {
        try {
            const docRef = doc(db, "ads", adId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const adData = docSnap.data();
                setCurAd(adData);
               
                const userId = adData.userId;
                const userQuery = query(collection(db, "users"), where("userId", "==", userId));
                const userSnapshot = await getDocs(userQuery);

                userSnapshot.forEach((userDoc) => {
                    setAdAuthor(userDoc.data());
                });
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching ad details:", error);
        }
    };


console.log(curAd)


    return (
        <div>
        { curAd === null
       ? <div className="container adDetailBox"><h2>Loading...</h2> </div>
       
       :<div className="container adDetailBox">
        <div className="adInfoBox">
            <div className="adThumb"><img src={curAd.adImages.length && curAd.adImages[0]}/></div>
            <div className="adGallery">
                {!curAd.adImages ? "Loading..." 
                : 
                <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                >
            {curAd.adImages.map((item) => {
return <a href={item}><img src={item}/> </a>
            })}
                
                </LightGallery>
}
            </div>
            <div className="adDecription">
            <h2>Rs {curAd.adPrice}</h2>
            <h3>{curAd.adTitle}</h3>
            </div>


            <div className="adDecription">
            <h3>Details</h3>
            <p>Brand: <strong>Not Selected</strong></p>
            <p>Category: <strong>Not Selected</strong></p>
            <p>Stock: <strong>Not Selected</strong></p>
            <p>Rating: <strong>Not Selected</strong></p>
            </div>

            <div className="adDecription">
            <h3>Description</h3>
            <p>{curAd.adDescription}</p>
            </div>

        </div>

        <div className="adContact">
            <div className="avatar-sec">
            <div><img src={adAuthor && adAuthor.userDp}/></div>
            <div><h4>{adAuthor && `${adAuthor.firstName} ${adAuthor.lastName}`}</h4><p><a>{adAuthor && adAuthor.email}</a></p></div>
            </div>
            <button className="btnDark" onClick={() => { 
                  Swal.fire({
                    title: "Item Added To Cart",
                    text: "Selected Item Successfully Added To Cart For Purchase",
                    icon: "success",
                  });
                  
                dispatch(addToCart(curAd))
             // Show success message
            }    
        }> <i className="fa fa-shopping-cart"></i> Add To Cart</button>
            <button className="btnDark"><img src={phoneIcon} alt="phone"/> Show Phone Number</button>
            <button className="btnLight"><img src={chatIcon} alt="chat"/> Chat</button>
        </div>
        
        </div>

        }
        </div>
    )
}

export default AdDetail;