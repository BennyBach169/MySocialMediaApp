import { User } from "./User";

export class Post{

id:number;
datePosted:Date;
author:User;
content:string;
likeCount:number;

constructor(
    id:number,
    datePosted:Date,
    author:User,
    content:string,
    likeCount:number
){
        this.id=id;
        this.datePosted = datePosted;
        this.author =author;
        this.content = content;
        this.likeCount = likeCount;
    }
}