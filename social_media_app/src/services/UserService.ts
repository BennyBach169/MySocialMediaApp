import axios from "axios";
import { User } from "../models/User";
import { Post } from "../models/Post";
import { PostComment } from "../models/PostComment";

class UserService {
  async getUserDetails() {
//     return await (
//       await axios.get<User>(`http://localhost:8080/api/user/details`, {
//         headers: { Authorization: "Bearer " + token },
//       })
//     ).data;
//   }
    return (await axios.get<User>(`http://localhost:8080/api/user/details`)).data
  }
  
  async addPost(post:Post){
    return (await axios.post<User>(`http://localhost:8080/api/user/addpost`,post)).data
  }

  async checkIfPostLiked(postId:number){
    return (await axios.get<boolean>(`http://localhost:8080/api/user/checkIfPostLiked/${postId}`)).data
  }
  async likeUnlike(post:Post){
    return (await axios.post<boolean>(`http://localhost:8080/api/user/post/likeunlike`,post)).data
  }

  async getUserPosts(){
    return (await axios.get<Post[]>(`http://localhost:8080/api/user/posts`)).data
  }
  async commentOnPost(postComment:PostComment){
    return (await axios.post(`http://localhost:8080/api/user/post/comment`,postComment)).data
  }

  async updateUser(user:User){
    return (await axios.put(`http://localhost:8080/api/user/updateuser`,user)).data
  }

  async followUnfollow(followedId:number){
    return (await axios.post<boolean>(`http://localhost:8080/api/user/followunfollow/${followedId}`)).data
  }
  async checkIfFollowing(followedId:number){
    return (await axios.get<boolean>(`http://localhost:8080/api/user/checkIfFollowing/${followedId}`)).data
  }
  async editPost(post:Post){
    return (await axios.put(`http://localhost:8080/api/user/editpost`,post)).data
  }
  async deletePost(postId:number){
    return (await axios.delete(`http://localhost:8080/api/user/deletepost/${postId}`)).data
  }

  async getAllFollwers(){
    return (await axios.get<User[]>(`http://localhost:8080/api/user/followers`)).data
  }

  async getAllFollwings(){
    return (await axios.get<User[]>(`http://localhost:8080/api/user/followings`)).data
  }

  async deletePostComment(commentId:number){
    return (await axios.delete(`http://localhost:8080/api/user/post/deletecomment/${commentId}`)).data
  }

  async getFollowingFeed(){
    return (await axios.get<Post[]>(`http://localhost:8080/api/user/postsofollowings`)).data
  }

  

}
const userService = new UserService();
export default userService;
