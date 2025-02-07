import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import { useEffect, useState } from "react";
import { getToeknState } from "../../Utils";
import userService from "../../services/UserService";
import { User } from "../../models/User";
import { showErrorToast } from "../ToastNotifications";
import { ProfileCard } from "./ProfileCard/ProfileCard";
import feedService from "../../services/FeedService";
import { Post } from "../../models/Post";
import { PostCard } from "../Posts/PostCard/PostCard";
import { CreatePost } from "../CreatePost/CreatePost";
import { authStore, logOut } from "../../redux/AuthStore";

export function Profile(): JSX.Element {
    const params = useParams();
    const id = +params.id!;
    const [user,setUser] = useState<User>();
    const [owner,setOwner] = useState<boolean>(false);
    const [posts,setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        pullData();
        
        // if(getToeknState()){
            
        //     userService.getUserDetails()
        //     .then(res=>{
        //         if(res.id===id){
        //             setUser(res);
        //             setOwner(true);
        //         }
        //     })
        //     .catch(err=>{
        //         showErrorToast(err.response.data)
        //         authStore.dispatch(logOut());
        //         navigate('/login')
        //     })

        //     // userService.getUserPosts()
        //     // .then(res=>setPosts(res))
        //     // .catch(err=>showErrorToast(err.response.data));
        // }
        // if(!owner){
        //     feedService.getUserById(id)
        //     .then(res=>{setUser(res)})
        //     .catch(err=>showErrorToast(err.response.data));
        // }

        // feedService.getUsersPostsById(id)
        // .then(res=>setPosts(res))
        // .catch(err=>showErrorToast(err.response.data))
    },[])

    function pullData() {
        if(getToeknState()){
            
            userService.getUserDetails()
            .then(res=>{
                if(res.id===id){
                    setUser(res);
                    setOwner(true);
                }
            })
            .catch(err=>{
                showErrorToast(err.response.data)
                authStore.dispatch(logOut());
                navigate('/login')
            })

            // userService.getUserPosts()
            // .then(res=>setPosts(res))
            // .catch(err=>showErrorToast(err.response.data));
        }
        if(!owner){
            feedService.getUserById(id)
            .then(res=>{setUser(res)})
            .catch(err=>showErrorToast(err.response.data));
        }

        feedService.getUsersPostsById(id)
        .then(res=>setPosts(res))
        .catch(err=>showErrorToast(err.response.data))
    }
    
    return (
        <div className="Profile">
            {user && <ProfileCard updateState={pullData} user = {user} editable={owner}/>}
            {/* <div style={{width:'100%'}}>
            {owner && <CreatePost user={user!} pullData={()=>{}}/>}
            </div> */}
            <div style={{width:'100%'}}>
            {posts?.map(p=><PostCard post={p} key={p.id} pullData={pullData}/>)}
            </div>
        </div>
    );
}
