import { useEffect, useState } from "react";
import "./PostPage.css";
import { CreatePost } from "../CreatePost/CreatePost";
import { User } from "../../models/User";
import { useNavigate } from "react-router-dom";
import { getToeknState } from "../../Utils";
import userService from "../../services/UserService";
import { showErrorToast } from "../ToastNotifications";
import { authStore } from "../../redux/AuthStore";



export function PostPage(): JSX.Element {
    const [postClicked,setPostClicked] = useState<boolean>(false);
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


    function pullData(){
        navigate("/")
    }
    return (
        <div className="PostPage">
            {user&&
            <div className="postPagebox">
            <CreatePost user={user} pullData={pullData} forPostPage={true}/>
            </div>
            }
			 
        </div>
    );
}
