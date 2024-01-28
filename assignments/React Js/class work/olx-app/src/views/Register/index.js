import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { register } from "../../config/firebase";
import regImg from "../../images/reg-img.png"



function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName]= useState();
    const [lastName, setLastName]= useState();
    const [email, setEmail]= useState();
    const [phone, setPhone]= useState();
    const [password, setPassword]= useState();
    const [dob, setDob]= useState();
    const [gender, setGender] = useState('');
    const [dp, setDp]= useState();
    

const signUp = async ()=>{

  try{  
await register({firstName, lastName, email, phone, password, dob, gender, dp})
// navigate("/login")
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
    <img src={regImg} alt="Registration"/></div>
            <div className="col">
                
        <div className="formBox">
            <h2>Create an account</h2>
        <p>Its free and always will be</p>
        <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name"/>
        <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name"/>
        <input onChange={(e) => setEmail(e.target.value)}  type="email" placeholder="Email"/>
        <input onChange={(e) => setPhone(e.target.value)}  type="tel" placeholder="Phone"/>
        <input onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="Password" /> 
        <div className="width-sep"></div>
        <p className="dob"><strong>Birthday</strong>
        <input onChange={(e) => setDob(e.target.value)}  placeholder="Date Of Birth" type="date" />
        </p>

        <p className="radioField">
            <strong>Gender</strong>
            <label>
        <input
          type="radio"
          value="male"
          checked={gender === 'male'}
          onChange={(e) => setGender(e.target.value)}
        />
        Male
      </label>

      <label>
        <input
          type="radio"
          value="female"
          checked={gender === 'female'}
          onChange={(e) => setGender(e.target.value)}
        />
        Female
      </label>

      <label>
        <input
          type="radio"
          value="other"
          checked={gender === 'other'}
          onChange={(e) => setGender(e.target.value)}
        />
        Other
      </label>
        </p>

       
        <input onChange={(e) => setDp(e.target.files[0])}  type="file" />
        
        <button onClick={signUp}>Register</button>
        <p>Already have a account login your account <span onClick={()=> navigate('/Login')}>Here</span></p>
        </div>
        </div>

        
        </div>
    </div>
    )
}

export default Register