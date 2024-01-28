import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import editProfileImg from "../../images/edit-profile.jpg"
import avatar from "../../images/avatar.png"

import { auth } from '../../config/firebase'

import { db } from '../../config/firebase'

import { 
    ref, 
    uploadBytes,
    getDownloadURL 
  } from "firebase/storage";

import { storage } from '../../config/firebase'

import { onAuthStateChanged} from "firebase/auth";

import { collection, query, where, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";




function Profile() {

    const navigate = useNavigate();
    const[currentUser, setCurrentUser]=useState({});
    const[userAds, setUserAds]=useState([]);
    const[currentDocId, setCurrentDocId]=useState();


    //get current login info

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const loggedInUserId = user.uid;
                console.log("Logged In User ID:", loggedInUserId);
                const q = query(collection(db, "users"), where("userId", "==", loggedInUserId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setCurrentUser(doc.data());
                    
                });

            } else {
                setCurrentUser("");  // Clear currentUser when the user is not authenticated
            }
        });

        // Cleanup the subscription on component unmount
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const unsubscribeAd = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const loggedInUserId = user.uid;
                console.log("Logged In User ID:", loggedInUserId);
                const q = query(collection(db, "ads"), where("userId", "==", loggedInUserId));
                const querySnapshot = await getDocs(q);
                const adsData = [];
                querySnapshot.forEach((doc) => {
                    // Push each ad data to the adsData array
                    adsData.push(doc.data());
                    setCurrentDocId(doc.id)
                });
                // Set the ads data to the state
                setUserAds(adsData);
            } else {
                setCurrentUser("");  // Clear currentUser when the user is not authenticated
            }
        });
    
        // Cleanup the subscription on component unmount
        return () => unsubscribeAd();
    }, []);
    
    
    return (
        <div className="container space-80">
            <h2>User Profile</h2>
            <div className="profile-sec">
                <div className="pInfo">
                    <img src={currentUser.userDp} alt="User Display" />
                    <h2>{currentUser.firstName} {currentUser.lastName}</h2>
                    <ul>
                        <li><strong>Email:</strong> {currentUser.email}</li>
                        <li><strong>Phone:</strong> {currentUser.phone}</li>
                        <li><strong>Date Of Birth:</strong> {currentUser.dob}</li>
                        <li><strong>Gender:</strong> {currentUser.gender}</li>
                    </ul>
                </div>

                
                <div className="userAds ">
                <h2>User Ads</h2>
                <div className="adSec recentAds">
                    {userAds.map(item => {
                    const { adTitle, adPrice, adDescription, adImage } = item;
                    return <div className="adBox" onClick={() => navigate(`/ad-details/${currentDocId}`)}>
                        <img src={adImage} />

                        <div className="adInfo">
                            <div className="authorName">Ad Posted By: {currentUser.firstName}</div>
                        <h3>Rs {adPrice} </h3>
                        <h2>{adTitle}</h2>
                        <p>{adDescription}</p>
                        <button onClick={() => navigate(`/ad-details/${currentDocId}`)}> View Details</button>
                        </div>   

                    </div>
                })
            }
            </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;