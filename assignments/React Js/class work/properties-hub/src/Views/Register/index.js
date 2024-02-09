import { useSelector } from "react-redux"
function Register() {

    const theme = useSelector(state => state.theme);
    
    return (
        <>
        <div className="container"  style={{background: theme}}>
        <h2>Register</h2>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Register</button>
        </div>
        </>
    )
}

export default Register;