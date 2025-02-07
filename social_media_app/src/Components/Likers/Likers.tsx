import { useParams } from "react-router-dom";
import "./Likers.css";
import feedService from "../../services/FeedService";
import { useEffect, useState } from "react";
import { User } from "../../models/User";
import { showErrorToast } from "../ToastNotifications";
import { FollowingsProfiles } from "../Profile/ProfileCard/FollwingFollwersCount/ShowFollwersOrFollowings/FollowingsProfiles/FollowingsProfiles";

export function Likers(): JSX.Element {
    const params = useParams();
    const id = +params.id!;
    const [postLikers , setPostLikers] =useState<User[]>();

    useEffect(()=>{
        feedService.findAllPostLikers(id)
        .then(res=>{
           setPostLikers(res);
        })
        .catch(err=>showErrorToast(err.response.data))
    },[])



    return (
        <div className="Likers">
            <div className="likehead"><h2>Reactions</h2></div>
			{postLikers?.map(u=><FollowingsProfiles user={u} key={u.id}/>)}
        </div>
    );
}
