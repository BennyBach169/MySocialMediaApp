import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { AdminLogin } from "./AdminLogin/AdminLogin";
import { adminLogout, authStore } from "../../redux/AuthStore";
import { UsersCard } from "./UsersCard/UsersCard";
import authService from "../../services/AuthService";
import { showErrorToast } from "../ToastNotifications";

export function AdminDashboard(): JSX.Element {
    const [loggedIn,setLoggedIn] = useState<boolean>(false);
    const [showActive,setShowActive] = useState<boolean>(false);

    useEffect(()=>{
        pullData();
  
        
    },[])

    function pullData(){
        let token = authStore.getState().adminToken;
        if(token){
            setLoggedIn(true)
        }
    }

    function handleClick(){
        let token = authStore.getState().adminToken;
        authService.adminLogout(token)
        .then(res=>{
            setLoggedIn(false);
            authStore.dispatch(adminLogout());
        })
        .catch(err=>showErrorToast(err.response.data))
    }
    return (
        <div className="AdminDashboard">
            {!loggedIn && <AdminLogin pullData={pullData}/>}
            {loggedIn &&
            <div>
                <button onClick={handleClick} style={{
                    color:"white",
                    background:"black",
                    borderRadius:'25px',
                    margin:"1rem"
                }}>Logout</button>
            <UsersCard/>
            </div>
            }
			
        </div>
    );
}
