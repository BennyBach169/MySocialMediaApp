import React from "react";
import "./AdminLogin.css";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../services/AuthService";
import { adminLogin, authStore, login } from "../../../redux/AuthStore";
import { showErrorToast } from "../../ToastNotifications";

interface DataProps{
    pullData():void
}

export function AdminLogin(props:DataProps): JSX.Element {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");


    function handleSubmit(event:React.FormEvent){
        event.preventDefault();
        
        authService.adminLogin(email,password)
        .then((res)=>{
            props.pullData();
            sessionStorage.setItem("atoken",res);
            authStore.dispatch(adminLogin(res));
        })
        .catch(err=>showErrorToast(err.response?.data))
    }
    return (
        <div className="AdminLogin">
			  <button className="noTokenButton" onClick={()=>{navigate('/'); }}>Back</button>
            <div className="loginContainer">
			<form action="" className="form" onSubmit={handleSubmit}>
            <div className="headerLogin">Welcome Back</div>
                <input type="text" placeholder="Email" required onChange={e=>setEmail(e.target.value)} />
                <input type="password" placeholder="Passwrod" required onChange={e=>setPassword(e.target.value)} />
                <button type="submit" onTouchStart={handleSubmit}>Login</button>
            </form>
            </div>
        </div>
    );
}
