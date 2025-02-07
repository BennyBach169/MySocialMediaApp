import { useEffect, useState } from "react";
import "./FollowUnfollow.css";
import userService from "../../services/UserService";
import { getToeknState } from "../../Utils";
import { showErrorToast } from "../ToastNotifications";
import { useNavigate } from "react-router-dom";

interface DataProps{
    editable?:boolean;
    toBeFollowedId:number;


}

export function FollowUnfollow(props:DataProps): JSX.Element {
    const [following , setFollowing] = useState<boolean>(false);
    const navigate=useNavigate();

    useEffect(()=>{
        if(getToeknState()){
        userService.checkIfFollowing(props.toBeFollowedId)
        .then(res=>setFollowing(res))
        .catch(err=>showErrorToast(err.response.data))
        }
    },[following])

    function handleClick(){
        if(getToeknState()){
        userService.followUnfollow(props.toBeFollowedId)
        .then(res=>setFollowing(res))
        .catch(err=>showErrorToast(err.response.data))
        }else{
            navigate("/login")
        }
    }


    return (
        <div className="FollowUnfollow">
			{following&& <button onClick={handleClick}>Unfollow</button>}
            {!following&& <button onClick={handleClick}>Follow</button>}
        </div>
    );
}
