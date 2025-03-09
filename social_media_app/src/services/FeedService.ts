import axios from "axios";
import { Post } from "../models/Post";
import { PostComment } from "../models/PostComment";
import { User } from "../models/User";


class FeedService{
    async getAllPosts(){
        return (await axios.get<Post[]>(`http://localhost:8080/api/feed/posts`)).data
    }
    async getPostComments(postId:number){
        return (await axios.get<PostComment[]>(`http://localhost:8080/api/feed/postcomments/${postId}`)).data

    }
    async getPost(postId:number){
        return (await axios.get<Post>(`http://localhost:8080/api/feed/getpost/${postId}`)).data

    }

    async getPostCommentsCount(postId:number){
        return (await axios.get<number>(`http://localhost:8080/api/feed/getCommentsCount/${postId}`)).data

    }

    async getUserById(userId:number){
        return (await axios.get<User>(`http://localhost:8080/api/feed/getuserbyid/${userId}`)).data

    }

    async getUsersPostsById(userId:number){
        return (await axios.get<Post[]>(`http://localhost:8080/api/feed/getusersposts/${userId}`)).data
    }

    async getAllFollwers(userId:number){
        return (await axios.get<User[]>(`http://localhost:8080/api/feed/getuserfollowers/${userId}`)).data
      }
    
      async getAllFollwings(userId:number){
        return (await axios.get<User[]>(`http://localhost:8080/api/feed/getuserfollowings/${userId}`)).data
      }

      async findAllPostLikers(postId:number){
        return (await axios.get<User[]>(`http://localhost:8080/api/feed/findallpostlikers/${postId}`)).data
      }
  
}

const feedService = new FeedService;
export default feedService;
