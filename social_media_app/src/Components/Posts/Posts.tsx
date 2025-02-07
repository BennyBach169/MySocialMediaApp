import { useEffect, useState } from "react";
import "./Posts.css";
import { Post } from "../../models/Post";
import { PostCard } from "./PostCard/PostCard";
import feedService from "../../services/FeedService";
interface DataProps{
    posts:Post[];
    pullData():void
}
export function Posts(props:DataProps): JSX.Element {
    // const [posts,setPosts] = useState<Post[]>([]);
    // useEffect(()=>{
    //     setPosts(props.posts)
    //     feedService.getAllPosts()
    //     .then(res=>setPosts(res))
    //     .catch(err=>alert(err.response.data))
        
    // },[])

   

    
  
    return (
        <div className="Posts">
			{props.posts?.map(p=><PostCard post={p} key={p.id} pullData={props.pullData}/>)}
        </div>
    );
}
