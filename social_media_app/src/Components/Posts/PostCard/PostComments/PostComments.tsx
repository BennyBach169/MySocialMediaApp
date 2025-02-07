import { useEffect, useState } from "react";
import "./PostComments.css";
import { PostComment } from "../../../../models/PostComment";
import feedService from "../../../../services/FeedService";
import { CommentCard } from "./CommentCard/CommentCard";
interface DataProps{
    // postId: number;
    psotComments:PostComment[];
    pullData():void
}
export function PostComments(props: DataProps): JSX.Element {
    const [showAll,setShowAll] = useState<boolean>(false);
    const postComment = props.psotComments[0];
    // const [postComments,setPostComments] = useState<PostComment[]>([]);
    // useEffect(()=>{
    //     feedService.getPostComments(props.postId)
    //     .then(res=>setPostComments(res))
    //     .catch(err=>console.log(err.response.data))
    // },[])

    return (
        <div className="PostComments">
            {showAll &&  props.psotComments?.map(p=><CommentCard pullData={props.pullData} postComment={p} key={p.id}/>)}
            {showAll &&
            <div className="commentsButton">
            <button onClick={()=>setShowAll(false)}>Show less</button>
            </div> 
            }
            {!showAll && postComment && <CommentCard pullData={props.pullData} postComment={props.psotComments[0]} />}
            {!showAll &&
            <div className="commentsButton">
            <button onClick={()=>setShowAll(true)}>Show all comments</button>
            </div> 
            }
			
        </div>
    );
}
