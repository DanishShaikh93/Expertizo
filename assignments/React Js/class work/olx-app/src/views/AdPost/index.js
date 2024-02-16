import { useState, useEffect } from "react"
import { adPostToDb } from "../../config/firebase";
import adImg from "../../images/ad-img.avif"

import { auth } from '../../config/firebase'

import { db } from '../../config/firebase'

import { onAuthStateChanged, signOut} from "firebase/auth";

import { collection, query, where, getDocs } from "firebase/firestore";
import fileLoading from '../../images/fileload.gif'

function AdPost() {

  const [adTitle, setAdTitle] = useState();
  const [adPrice, setAdPrice] = useState();
  const [adDescription, setAdDescription] = useState();
  const [adImages, setAdImages] = useState([]);

  const[currentUser, setCurrentUser]=useState();


  const [loading, setLoading] = useState(false);


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
// console.log(adImages)
    try{
        setLoading(true);
await adPostToDb({adTitle, adPrice, adDescription, adImages, currentUser});

 // Clear the state after posting
 setAdTitle("");
 setAdPrice("");
 setAdDescription("");
 setAdImages([]); // Clear the array of images


   // Clear the file input field
   document.getElementById("fileInput").value = "";
   setLoading(false);

    } catch (error){
alert(error)
    }
  }
   console.log(currentUser) 
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
        {/* <input type="file" onChange={(e)=> setAdImage(e.target.files[0])} required/> */}
        <input id="fileInput" type="file" onChange={(e) => setAdImages([...adImages, ...e.target.files])} multiple required />

        <button onClick={adPost}>Post Ad</button>
      
        {loading && (
    <div className="loading">
        <img src={fileLoading} alt="Loading"  height="50" />
    </div>
)}
        </div>
        </div>
    </div>
    </div>
    )
}

export default AdPost;