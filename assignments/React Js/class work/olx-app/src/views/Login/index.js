import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../../config/firebase";
import logImg from "../../images/login.jpg"

function Login() {
    const navigate = useNavigate();

    const [email, setEmail]= useState();
    const [password, setPassword]= useState();

    const  signIn = async () =>{
        try{
       await login({email, password})
       navigate("/")
    } catch (error) {
        console.log(error)
    }

    }
    
    return (

        <div className="container space-80">
             
<div className="d-flex">
<div className="sideImg">
    <img src={logImg}/></div>
            <div className="col">
                
        <div className="formBox">
        <h2>Enter Your Login Details</h2>
        <input onChange={(e) => setEmail(e.target.value)}  type="email" placeholder="Email"/>
        <input onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="Password" />
        <button onClick={signIn}>Login</button>
        <p>Don't have a account yet create your account <span onClick={()=> navigate('/Register')}>Here</span></p>
            </div>
        </div>

        
        </div>
    </div>
    )
}

export default Login