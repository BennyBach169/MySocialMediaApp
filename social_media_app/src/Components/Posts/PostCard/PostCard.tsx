import { useEffect, useState } from "react";
import { Post } from "../../../models/Post";
import { getToeknState, timeAgo } from "../../../Utils";
import { CommentOnPost } from "./CommentOnPost/CommentOnPost";
import "./PostCard.css";
import { PostComments } from "./PostComments/PostComments";
import { PostDetails } from "./PostDetails/PostDetails";
import { PostProfile } from "./PostProfile/PostProfile";
import { PostComment } from "../../../models/PostComment";
import feedService from "../../../services/FeedService";
import { User } from "../../../models/User";
import userService from "../../../services/UserService";
import { showErrorToast } from "../../ToastNotifications";
import { EditOrDeletePost } from "./EditOrDeletePost/EditOrDeletePost";

interface DataProps{
    post:Post
    pullData():void
}

export function PostCard(props: DataProps ): JSX.Element {
    const [postComments,setPostComments] = useState<PostComment[]>([]);
    const [user , setUser] = useState<User>();
    const [owner,setOwner] = useState<boolean>(false);

    useEffect(()=>{
        if(getToeknState()){
            userService.getUserDetails()
            .then(res=>{
                setUser(res)
                if(res.id===props.post.author.id)
                setOwner(true)

            })
            .catch(err=>showErrorToast(err.response.data))
        }
       pullData();
    },[])

    function pullData(){
        feedService.getPostComments(props.post.id)
        .then(res=>setPostComments(res))
        .catch(err=>console.log(err.response.data))
    }



    return (
        <div className="PostCard">
            <PostProfile user = {props.post.author} datePosted={props.post.datePosted}/>
			<div className="postContect">{props.post.content}</div>
            <PostDetails post={props.post}/>
            {user&& <CommentOnPost pullData={pullData} user={user} post={props.post}/>}
        
            <PostComments psotComments={postComments} pullData={pullData}/>
            <div className="editOrDeleteBox">
            {owner&&  <EditOrDeletePost user={user!} pullData={props.pullData} post={props.post}/>}
            </div>
        </div>
    );
}
