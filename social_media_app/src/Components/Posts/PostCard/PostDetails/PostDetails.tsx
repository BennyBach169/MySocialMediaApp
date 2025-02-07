import { useEffect, useState } from "react";
import { Post } from "../../../../models/Post";
import "./PostDetails.css";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import userService from "../../../../services/UserService";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { showErrorToast } from "../../../ToastNotifications";
import { getToeknState } from "../../../../Utils";
import feedService from "../../../../services/FeedService";
import { User } from "../../../../models/User";
import { ShowFollwersOrFollowings } from "../../../Profile/ProfileCard/FollwingFollwersCount/ShowFollwersOrFollowings/ShowFollwersOrFollowings";
import { FollowingsProfiles } from "../../../Profile/ProfileCard/FollwingFollwersCount/ShowFollwersOrFollowings/FollowingsProfiles/FollowingsProfiles";
import { useNavigate } from "react-router-dom";
interface DataProps{
    post:Post
}
export function PostDetails(props:DataProps): JSX.Element {
    const [isPostLiked, setIsPostLiked] = useState<boolean>(false);
    const [likeCount,setLikeCount] = useState<number>(props.post.likeCount);
    const [commentsCount, setCommentsCount] = useState<number>();
    const [postLikers,setPostLikers] = useState<User[]>([]);
    const [showAllLikers,setShowAllLikers] =useState<boolean>(false);
    const navigate=useNavigate();
    // const [post,setPost] = useState<Post>(props.post);
    

    // useEffect(()=>{
    //     if(getToeknState()){
    //     userService.checkIfPostLiked(props.post.id)
    //     .then(res=>{
    //         setIsPostLiked(res);
    //     })
    //     .catch(err=>showErrorToast(err.response?.data))
      
    //  }
    //  feedService.getPostCommentsCount(props.post.id)
    //  .then(res=>setCommentsCount(res))
    //  .catch(err=>showErrorToast(err.response.data));

    // },[likeCount])

    // function handleClick(){
    //     if(getToeknState()){
    //         userService.likeUnlike(props.post)
    //         .then(res=>{
    //             setIsPostLiked(res)
    //             if(res){
    //                 setLikeCount(likeCount+1)
    //             }else{
    //                 setLikeCount(likeCount-1)
    //             }
    //         })
    //         .catch(err=>showErrorToast(err.response?.data))
    //     }
    // }


    useEffect(()=>{
        if(getToeknState()){
        userService.checkIfPostLiked(props.post.id)
        .then(res=>{
            setIsPostLiked(res);
        })
        .catch(err=>showErrorToast(err.response?.data))
      
     }
     feedService.getPostCommentsCount(props.post.id)
     .then(res=>setCommentsCount(res))
     .catch(err=>showErrorToast(err.response.data));
     pullLikersData();
    

    },[])



    function handleClick(){
        if(getToeknState()){
            userService.likeUnlike(props.post)
            .then(res=>{
                setIsPostLiked(res)
               pullLikersData();
            })
            .catch(err=>showErrorToast(err.response?.data))
        }
    }

    function pullLikersData(){
        feedService.findAllPostLikers(props.post.id)
        .then(res=>{
           setLikeCount(res.length);
           setPostLikers(res);
        })
        .catch(err=>showErrorToast(err.response.data))
    }

    function handleBack(){
        setShowAllLikers(false);
    }

    return (
        <div className="PostDetails">
            <div>
			<ChatBubbleOutlineOutlinedIcon fontSize="small" sx={{
                paddingTop:"3px",
                color:"#0f14198c"
            }}/>
            <span className="postDatas">{commentsCount}</span>
            </div>
            <div>
                {isPostLiked ? 
                <FavoriteIcon onClick={handleClick} fontSize="small" sx={{
                    color:"red"
                }}/>
                : 
                <FavoriteBorderOutlinedIcon onClick={handleClick} fontSize="small" sx={{
                    color:"#0f14198c"
                }}/>
                }
            {/* <FavoriteBorderOutlinedIcon fontSize="small" sx={{
                color:"#0f14198c"
            }}/> */}
            <span  onClick={()=>navigate(`/likers/${props.post.id}`)} className="postDatas">{likeCount}</span>
            </div>
        </div>
    );
}
