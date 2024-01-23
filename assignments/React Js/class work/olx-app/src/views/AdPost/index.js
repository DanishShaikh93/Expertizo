import { useState } from "react"
import { adPostToDb } from "../../config/firebase";
import adImg from "../../images/ad-img.avif"

function AdPost() {

  const [adTitle, setAdTitle] = useState();
  const [adPrice, setAdPrice] = useState();
  const [adDescription, setAdDescription] = useState();
  const [adImage, setAdImage] = useState();
  
  const adPost= async (event) => {
    // console.log("Ad Posted")
// console.log(adImage)
    try{

await adPostToDb({adTitle, adPrice, adDescription, adImage});

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
        <input onChange={(e) => setAdTitle(e.target.value)} type="text" placeholder="Ad Title" value={adTitle}/>
        <input onChange={(e) => setAdPrice(e.target.value)} type="text" placeholder="Ad Price" value={adPrice}/>
        <textarea onChange={(e) => setAdDescription(e.target.value)}  placeholder="Ad Description" rows="5" value={adDescription}></textarea>
        <input type="file" onChange={(e)=> setAdImage(e.target.files[0])}/>
        <button onClick={adPost}>Post Ad</button>
        
        </div>
        </div>
    </div>
    </div>
    )
}

export default AdPost;