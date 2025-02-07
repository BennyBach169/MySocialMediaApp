import { useEffect, useRef, useState } from "react";
import { User } from "../../models/User";
import "./CreatePost.css";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import userService from "../../services/UserService";
import { Post } from "../../models/Post";
import { showErrorToast, showSuccessToast } from "../ToastNotifications";

interface DataProps{
    user:User;
    pullData():void
    editable?:boolean
    forPostPage?:boolean
}

export function CreatePost(props:DataProps): JSX.Element {
    const [postContent, setPostContent] = useState("");
    const contentRef = useRef<HTMLDivElement>(null);
    const [x,setX] = useState<string | number | undefined>("3rem");

    useEffect(()=>{
        if(props.forPostPage ==  true){
            setX("18rem")
        }else{
            setX("3rem")
        }
    },[x])

    const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
            setPostContent(e.currentTarget.innerText|| "");
    };
    

    function handleSubmit(event:React.FormEvent){
        event.preventDefault();
        if(postContent!==""){
        let post:Post=new Post(0,new Date(),props.user,postContent,0);
        userService.addPost(post)
        .then((res)=>{
            showSuccessToast("Post added")
            props.pullData();
            setPostContent("");
            if (contentRef.current) {
                contentRef.current.innerText = "";
            }
        })
        .catch(err=>showErrorToast(err.response?.data))
      }
    }

    

    return (
        <div className="CreatePost">
			<div className="profileImage">
                <img src={props.user.image} alt="" />
            </div>

            <div className="createPostContent">
                <form action="" onSubmit={handleSubmit}>
                    <div
                     className="createPostContentText" 
                     style={{
                        minHeight:x
                     }}
                     contentEditable="true"
                     data-placeholder="What Is Happening?!"
                     onInput={handleInputChange}
                     ref={contentRef}
                     />
                      <input type="hidden" name="postContent" value={postContent} />
                      <div className="addAndSubmitPost">
                        <div>
                        <AddAPhotoOutlinedIcon fontSize="small"/>
                        <AddReactionOutlinedIcon fontSize="small"/>
                        </div>
                      <button type="submit" className="createPostSubmit">Post</button>
                      </div>
                </form>
            </div>
        </div>
    );
}
