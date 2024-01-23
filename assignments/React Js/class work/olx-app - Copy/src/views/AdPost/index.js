import { useState } from "react"
import { adPostToDb } from "../../config/firebase";
import adImg from "../../images/ad-img.avif"

function AdPost() {

  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  
  const adPost= async (event) => {
    // console.log("Ad Posted")
    try{

await adPostToDb({adTitle, adDescription});

setAdTitle("");
setAdDescription("");

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
        <textarea onChange={(e) => setAdDescription(e.target.value)}  placeholder="Ad Description" rows="5" value={adDescription}></textarea>
        <button onClick={adPost}>Post Ad</button>
        
        </div>
        </div>
    </div>
    </div>
    )
}

export default AdPost;