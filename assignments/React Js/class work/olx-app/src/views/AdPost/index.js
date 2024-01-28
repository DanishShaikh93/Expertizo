import { useState, useEffect } from "react"
import { adPostToDb } from "../../config/firebase";
import adImg from "../../images/ad-img.avif"

import { auth } from '../../config/firebase'

import { db } from '../../config/firebase'

import { onAuthStateChanged, signOut} from "firebase/auth";

import { collection, query, where, getDocs } from "firebase/firestore";

function AdPost() {

  const [adTitle, setAdTitle] = useState();
  const [adPrice, setAdPrice] = useState();
  const [adDescription, setAdDescription] = useState();
  const [adImage, setAdImage] = useState();

  const[currentUser, setCurrentUser]=useState();


    //get current login info

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const loggedInUserId = user.uid;
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



  
  const adPost= async (event) => {
    // console.log("Ad Posted")
// console.log(adImage)
    try{

await adPostToDb({adTitle, adPrice, adDescription, adImage, currentUser});

setAdTitle("");
setAdPrice("");
setAdDescription("");
// setAdImage(null);


    } catch (error){
alert(error)
    }
  }
    
    return (
        <div className="container space-80">

<div className="d-flex">
<div className="sideImg">
    <img src={adImg}/></div>
            <div className="col">

        <div className="formBox">
        <h2>Enter Your Ad Details</h2>
        <input onChange={(e) => setAdTitle(e.target.value)} type="text" placeholder="Ad Title" value={adTitle} required/>
        <input onChange={(e) => setAdPrice(e.target.value)} type="text" placeholder="Ad Price" value={adPrice} required/>
        <textarea onChange={(e) => setAdDescription(e.target.value)}  placeholder="Ad Description" rows="5" value={adDescription} required></textarea>
        <input type="file" onChange={(e)=> setAdImage(e.target.files[0])} required/>
        <button onClick={adPost}>Post Ad</button>
        
        </div>
        </div>
    </div>
    </div>
    )
}

export default AdPost;