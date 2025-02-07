import { useEffect, useState } from "react";
import "./Home.css";
import { PostCard } from "../Posts/PostCard/PostCard";
import { Post } from "../../models/Post";
import { Posts } from "../Posts/Posts";
import { CreatePost } from "../CreatePost/CreatePost";
import feedService from "../../services/FeedService";
import { User } from "../../models/User";
import { getToeknState} from "../../Utils";
import userService from "../../services/UserService";
import { showErrorToast } from "../ToastNotifications";
import { useNavigate } from "react-router-dom";
import { authStore, logOut } from "../../redux/AuthStore";

export function Home(): JSX.Element {
    const [activeButton, setActiveButton] = useState<string>("feed");
    const [user,setUser] = useState<User>();
    const [posts,setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
      
      pullData();
    },[])

    function pullData(){
        if(getToeknState()){
            userService.getUserDetails()
            .then(res=>setUser(res))
            .catch(err=>{
                showErrorToast(err.response?.data);
                authStore.dispatch(logOut());
                navigate("/login");
            });

            
        }
        feedService.getAllPosts()
            .then(res=>setPosts(res))
            .catch(err=>{
                showErrorToast(err.response?.data);
            })
    }

    function handleFollowingClick(){
      if(getToeknState()){
        userService.getFollowingFeed()
        .then(res=>setPosts(res))
        .catch(err=>showErrorToast(err.response.data))
      }
    }
  
    const handleButtonClick = (buttonName: string) => {
      setActiveButton(buttonName);
    };
  
    return (
      <div className="Home">
        <div className="homebuttons">
          <button
            className={`homebutton ${activeButton === "feed" ? "active" : ""}`}
            onClick={() => {handleButtonClick("feed"); pullData(); }}
          >
            Feed
          </button>
          <button
            className={`homebutton ${activeButton === "following" ? "active" : ""}`}
            onClick={() => {handleButtonClick("following"); handleFollowingClick();}}
          >
            Following
          </button>
          {user && <CreatePost user={user} pullData={pullData}/>}
          <Posts posts={posts} pullData={pullData}/>
        </div>
      </div>
    );
  }
