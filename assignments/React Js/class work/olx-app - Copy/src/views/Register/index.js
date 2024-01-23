import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { register } from "../../config/firebase";
import regImg from "../../images/reg-img.png"



function Register() {
    const navigate = useNavigate();
    const [name, setName]= useState();
    const [age, setAge]= useState();
    const [email, setEmail]= useState();
    const [password, setPassword]= useState();
    

const signUp = async ()=>{
  try{  
await register({name, age, email, password})
navigate("/login")
} catch (error){
 console.log(error)
}


}

    return (
        <div className="container space-80">
             
<div className="d-flex">
<div className="sideImg">
<div className="txt-center">
            <h1>Welcome to OLX</h1>
            <h3>The trusted community of buyers and sellers.</h3>
            </div>
    <img src={regImg}/></div>
            <div className="col">
                
        <div className="formBox">
        <h2>Enter Your Details For Registration</h2>
        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name"/>
        <input onChange={(e) => setEmail(e.target.value)}  type="email" placeholder="Email"/>
        <input onChange={(e) => setAge(e.target.value)}  type="text" placeholder="Age"/>
        <input onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="Password" />
        <button onClick={signUp}>Register</button>
        <p>Already have a account login your account <span onClick={()=> navigate('/Login')}>Here</span></p>
        </div>
        </div>

        
        </div>
    </div>
    )
}

export default Register