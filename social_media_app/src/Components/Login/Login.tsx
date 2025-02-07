import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import React from "react";
import authService from "../../services/AuthService";
import { authStore, login } from "../../redux/AuthStore";
import { showErrorToast, showSuccessToast } from "../ToastNotifications";



export function Login(): JSX.Element {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");


    function handleSubmit(event:React.FormEvent){
        event.preventDefault();
        
        authService.login(email,password)
        .then((res)=>{
            sessionStorage.setItem("token",res);
            authStore.dispatch(login(res));
            navigate("/")
            
        })
        .catch(err=>showErrorToast(err.response?.data))
    }

    return (
        <div className="Login">
            <button className="noTokenButton" onClick={()=>{navigate('/'); }}>Browse without login</button>
            <div className="loginContainer">
			<form action="" className="form" onSubmit={handleSubmit}>
            <div className="headerLogin">Welcome Back</div>
                <input type="email" placeholder="Email" required onChange={e=>setEmail(e.target.value)} />
                <input type="password" placeholder="Passwrod" required onChange={e=>setPassword(e.target.value)} />
                <NavLink to={"/register"} style={{
                    color:"black",
                    fontSize:"0.8rem",
                    marginTop:"0.5rem"
                }}>Create New Account</NavLink>
                <button type="submit" onTouchStart={handleSubmit}>Login</button>
            </form>
            </div>
        </div>
    );
}
