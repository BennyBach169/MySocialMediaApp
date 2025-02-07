import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { MenuButtons } from "./MenuButtons/MenuButtons";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { MenuLogInButton } from "./MenuLogInButton/MenuLogInButton";
import { useEffect, useState } from "react";
import { getToeknState } from "../../Utils";
import userService from "../../services/UserService";
import { User } from "../../models/User";
import { showErrorToast } from "../ToastNotifications";
import { authStore } from "../../redux/AuthStore";
import { CreatePost } from "../CreatePost/CreatePost";


export function Menu(): JSX.Element {
    const [user,setUser] = useState<User>();
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(getToeknState()){
            userService.getUserDetails()
            .then(res=>setUser(res))
            .catch(err=>{
                showErrorToast(err.response.data);
                navigate("/login")
            })
        }
        
    },[authStore.getState().token])

    function handlePostClick(){
        if(user){
            navigate("/postpage")
        }else{
            navigate("/login")
        }
    }


    return (
        <div className="Menu">
            <div className="logo">
                <img src="/assets/Golden Black Minimalist Elegant Apartment Logo (2).png" alt="" />
            </div>
            
            <MenuButtons
             path="/"
            icon={<HomeOutlinedIcon fontSize="large" sx={{color:'#0F1419'}} />} 
            text="Home"/>
            {user && 
            <MenuButtons 
            path={"/profile/"+user?.id} 
            icon={<Person2OutlinedIcon fontSize="large" sx={{color:'#0F1419'}}/>} 
            text="Profile"/>
            }
            {!user &&
              <MenuButtons 
              path={"/login"} 
              icon={<Person2OutlinedIcon fontSize="large" sx={{color:'#0F1419'}}/>} 
              text="Profile"/>
            }
            <button className="postButton" onClick={handlePostClick}>Post</button>
            <button className="postButtonPhone" onClick={handlePostClick}>+</button>
            <div className="notDisplayOnPhone">
            <MenuLogInButton />
            </div>
        </div>
    );
}
