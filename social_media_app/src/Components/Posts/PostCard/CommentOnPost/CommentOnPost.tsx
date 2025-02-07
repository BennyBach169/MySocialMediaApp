import { useRef, useState } from "react";
import "./CommentOnPost.css";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { PostComment } from "../../../../models/PostComment";
import { User } from "../../../../models/User";
import { Post } from "../../../../models/Post";
import userService from "../../../../services/UserService";
import { showErrorToast, showSuccessToast } from "../../../ToastNotifications";

interface DataProps{
    pullData():void;
    user:User;
    post:Post;
}

export function CommentOnPost(props:DataProps): JSX.Element {
    const [commentContent, setCommentContent] = useState("");
        const contentRef = useRef<HTMLDivElement>(null);

        const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
            setCommentContent(e.currentTarget.textContent || "");
        };

        function handleSubmit(event:React.FormEvent){
            event.preventDefault();
            if(commentContent!==""){
            let comment:PostComment = new PostComment(0,props.user,commentContent,new Date(),props.post)
            userService.commentOnPost(comment)
            .then((res)=>{
                showSuccessToast("Comment added")
                props.pullData();
                setCommentContent("");
                if (contentRef.current) {
                    contentRef.current.textContent = "";
                }
            })
            .catch(err=>showErrorToast(err.response?.data))
          }
        }


    return (
        <div className="CommentOnPost">
			<div className="createCommentContent">
                <form action="" onSubmit={handleSubmit}>
                    <div
                     className="createPostContentText" 
                     contentEditable="true"
                     data-placeholder="Add a comment..."
                     onInput={handleInputChange}
                     ref={contentRef}
                     />
                      <input type="hidden" name="postContent" value={commentContent} />
                      <div className="addAndSubmitPost">
                        <div>
                        <AddAPhotoOutlinedIcon fontSize="small"/>
                        <AddReactionOutlinedIcon fontSize="small"/>
                        </div>
                      <button  type="submit" className="createPostSubmit" >Comment</button>
                      </div>
                </form>
            </div>
        </div>
    );
}
