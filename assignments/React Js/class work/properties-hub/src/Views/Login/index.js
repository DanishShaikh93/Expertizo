import { useSelector } from "react-redux"
function Login() {
    
    const theme = useSelector(state => state.theme);

    return (
        <>
        <div className="container"  style={{background: theme}}>
        <h2>Login</h2>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Login</button>
        </div>
        </>
    )
}

export default Login;